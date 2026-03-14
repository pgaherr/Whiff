import { useState } from 'react';
import ContactTile from '../components/ContactTile';
import './ContactsPage.css';

const EMERGENCY_NUMBERS = [
  { region: 'United States / Canada', number: '911' },
  { region: 'European Union (Spain, France, Germany…)', number: '112' },
  { region: 'United Kingdom', number: '999' },
  { region: 'Australia', number: '000' },
  { region: 'Japan', number: '119' },
  { region: 'China', number: '120' },
  { region: 'India', number: '112' },
  { region: 'Brazil', number: '192' },
  { region: 'Mexico', number: '911' },
];

const AVATAR_COLORS = ['#3B82F6', '#22C55E', '#F97316', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function ContactsPage() {

  const initialContacts = [
    { id: 1, name: 'Marie Allard', relationship: 'Mother', initials: 'MA', avatarColor: '#3B82F6', phone: '+1 617-555-0101' },
    { id: 2, name: 'Jonas Lee', relationship: 'Roommate', initials: 'JL', avatarColor: '#22C55E', phone: '+1 617-555-0202' },
    { id: 3, name: 'Dr. Kim', relationship: 'Emergency contact', initials: 'DK', avatarColor: '#F97316', phone: '+1 617-555-0303' },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(EMERGENCY_NUMBERS[0]);
  const [newContact, setNewContact] = useState({ name: '', relationship: '', phone: '' });

  const addContact = () => {
    if (!newContact.name.trim()) return;
    const contact = {
      id: Date.now(),
      name: newContact.name.trim(),
      relationship: newContact.relationship.trim() || 'Contact',
      initials: getInitials(newContact.name.trim()),
      avatarColor: AVATAR_COLORS[contacts.length % AVATAR_COLORS.length],
      phone: newContact.phone.trim(),
    };
    setContacts((prev) => [...prev, contact]);
    setNewContact({ name: '', relationship: '', phone: '' });
    setShowAddModal(false);
  };

  const removeContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleImportContact = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const props = ['name', 'tel'];
        const opts = { multiple: false };
        const importedContacts = await navigator.contacts.select(props, opts);
        
        if (importedContacts && importedContacts.length > 0) {
          const imported = importedContacts[0];
          setNewContact((prev) => ({
            ...prev,
            name: imported.name && imported.name.length > 0 ? imported.name[0] : prev.name,
            phone: imported.tel && imported.tel.length > 0 ? imported.tel[0] : prev.phone,
          }));
        }
      } catch (ex) {
        console.error('Contact selection failed:', ex);
        alert('Could not access contacts. Please ensure you granted permission.');
      }
    } else {
      alert('Your browser does not support the Web Contacts API. (This feature requires Chrome on Android).');
    }
  };

  return (
    <div className="contacts-page">
      <h1 className="contacts-page__title">Contacts</h1>

      {/* Emergency call section */}
      <section className="contacts-page__section">
        <h2 className="contacts-page__section-label">Emergency call</h2>
        <div className="emergency-card">
          <div className="emergency-card__top">
            <div className="emergency-card__info">
              <span className="emergency-card__number">{selectedRegion.number}</span>
              <span className="emergency-card__region">{selectedRegion.region}</span>
            </div>
            <a
              href={`tel:${selectedRegion.number}`}
              className="emergency-card__call-btn"
              aria-label={`Call ${selectedRegion.number}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>
          <div className="emergency-card__selector">
            <label htmlFor="region-select" className="emergency-card__selector-label">
              Your region
            </label>
            <select
              id="region-select"
              className="emergency-card__select"
              value={selectedRegion.region}
              onChange={(e) => {
                const found = EMERGENCY_NUMBERS.find((r) => r.region === e.target.value);
                if (found) setSelectedRegion(found);
              }}
            >
              {EMERGENCY_NUMBERS.map((r) => (
                <option key={r.region} value={r.region}>
                  {r.region} — {r.number}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Emergency contacts list */}
      <section className="contacts-page__section">
        <div className="contacts-page__section-header">
          <h2 className="contacts-page__section-label">
            Emergency contacts ({contacts.length})
          </h2>
          <button
            className="contacts-page__add-btn"
            onClick={() => setShowAddModal(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        </div>

        <div className="contacts-page__list">
          {contacts.map((c) => (
            <div key={c.id} className="contacts-page__contact-row">
              <ContactTile
                name={c.name}
                relationship={c.relationship}
                initials={c.initials}
                avatarColor={c.avatarColor}
                statusLabel={c.phone}
                statusBgColor="#F3F4F6"
              />
              <button
                className="contacts-page__remove-btn"
                onClick={() => removeContact(c.id)}
                aria-label={`Remove ${c.name}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}

          {contacts.length === 0 && (
            <p className="contacts-page__empty">
              No emergency contacts yet. Tap "Add" to create one.
            </p>
          )}
        </div>
      </section>

      {/* Add contact modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal__title" style={{ marginBottom: '20px' }}>
              Add contact
            </h3>

            {/* Native Contact Picker Button (supported in Chrome Android, always shown for demo) */}
            <button 
              type="button" 
              className="modal__btn" 
              onClick={handleImportContact}
              style={{ 
                marginBottom: '16px', 
                background: '#E0E7FF', 
                color: '#4338CA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Import from phone
            </button>

            <div className="modal__field">
              <label className="modal__label" htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                className="modal__input"
                placeholder="Full name"
                value={newContact.name}
                onChange={(e) => setNewContact((p) => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div className="modal__field">
              <label className="modal__label" htmlFor="contact-relationship">Relationship</label>
              <input
                id="contact-relationship"
                type="text"
                className="modal__input"
                placeholder="e.g. Mother, Roommate"
                value={newContact.relationship}
                onChange={(e) => setNewContact((p) => ({ ...p, relationship: e.target.value }))}
              />
            </div>

            <div className="modal__field">
              <label className="modal__label" htmlFor="contact-phone">Phone number</label>
              <input
                id="contact-phone"
                type="tel"
                className="modal__input"
                placeholder="+1 555-000-0000"
                value={newContact.phone}
                onChange={(e) => setNewContact((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>

            <div className="modal__actions">
              <button className="modal__btn modal__btn--cancel" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button
                className="modal__btn modal__btn--save"
                onClick={addContact}
                disabled={!newContact.name.trim()}
              >
                Add contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

