import ContactTile from '../components/ContactTile';
import MapWidget from '../components/MapWidget';
import SensorCard from '../components/SensorCard';
import StatusBadge from '../components/StatusBadge';
import './DashboardPage.css';

const DANGER_RED = '#EF4444';
const SAFE_GREEN = '#166534';
const WARNING_ORANGE = '#D97706';
const BADGE_GREEN_BG = '#DCFCE7';
const BADGE_GREY_BG = '#F3F4F6';

const sensors = [
  { name: 'Natural gas', value: '847', unit: 'ppm', statusColor: DANGER_RED, progressValue: 0.85 },
  { name: 'CO', value: '12', unit: 'ppm', statusColor: SAFE_GREEN, progressValue: 0.15 },
  { name: 'Chlorine', value: '0.3', unit: 'ppm', statusColor: SAFE_GREEN, progressValue: 0.1 },
  { name: 'Smoke', value: '34', unit: '%obs', statusColor: WARNING_ORANGE, progressValue: 0.35 },
];

const contacts = [
  { name: 'Marie Allard', relationship: 'Mother', initials: 'MA', avatarColor: '#3B82F6', statusLabel: 'SMS sent', statusBgColor: BADGE_GREEN_BG },
  { name: 'Jonas Lee', relationship: 'Roommate', initials: 'JL', avatarColor: '#22C55E', statusLabel: 'SMS sent', statusBgColor: BADGE_GREEN_BG },
  { name: 'Dr. Kim', relationship: 'Emergency contact', initials: 'Dr.K', avatarColor: '#F97316', statusLabel: 'Pending...', statusBgColor: BADGE_GREY_BG },
];

export default function DashboardPage() {
  return (
    <div className="dashboard">
      {/* Header row */}
      <div className="dashboard__header">
        <h1 className="dashboard__title">Live sensors</h1>
        <StatusBadge label="DANGER" backgroundColor={DANGER_RED} />
      </div>

      {/* Alert banner */}
      <div className="dashboard__alert">
        <div className="dashboard__alert-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="dashboard__alert-text">
          <strong>Natural gas detected. Evacuate immediately.</strong>
          <span>Level: 847 ppm</span>
        </div>
      </div>

      {/* Sensor cards grid */}
      <div className="dashboard__sensors">
        {sensors.map((s) => (
          <SensorCard key={s.name} {...s} />
        ))}
      </div>

      {/* Map */}
      <MapWidget />

      {/* Contacts */}
      <p className="dashboard__contacts-label">Emergency contacts — notified</p>
      <div className="dashboard__contacts">
        {contacts.map((c) => (
          <ContactTile key={c.name} {...c} />
        ))}
      </div>

      {/* Simulate button */}
      <button id="simulate-button" className="dashboard__simulate-btn">
        Simulate: all clear
      </button>
    </div>
  );
}
