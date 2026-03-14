import { useState } from 'react';
import './SettingsPage.css';

const initialToggles = {
  vibration: true,
  sound: true,
  sms: true,
  shareLocation: true,
};

const initialThresholds = [
  { id: 'natural_gas', label: 'Natural gas', value: 500, enabled: true },
  { id: 'co', label: 'CO', value: 35, enabled: true },
  { id: 'chlorine', label: 'Chlorine', value: 1.0, enabled: true },
];

const deviceInfo = [
  { label: 'Watch firmware', value: 'v1.2.0' },
  { label: 'Battery', value: '82%', highlight: true },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState(initialToggles);
  const [thresholds, setThresholds] = useState(initialThresholds);
  const [editingThreshold, setEditingThreshold] = useState(null);

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openEditor = (threshold) => {
    setEditingThreshold({ ...threshold });
  };

  const closeEditor = () => {
    setEditingThreshold(null);
  };

  const saveThreshold = () => {
    setThresholds((prev) =>
      prev.map((t) => (t.id === editingThreshold.id ? { ...editingThreshold } : t))
    );
    closeEditor();
  };

  return (
    <div className="settings">
      <h1 className="settings__title">Settings</h1>

      {/* Alerts section */}
      <section className="settings__section">
        <h2 className="settings__section-label">Alerts</h2>

        <ToggleRow
          label="Vibration alert on watch"
          checked={toggles.vibration}
          onChange={() => handleToggle('vibration')}
        />
        <ToggleRow
          label="Sound alert on phone"
          checked={toggles.sound}
          onChange={() => handleToggle('sound')}
        />
        <ToggleRow
          label="SMS to contacts"
          checked={toggles.sms}
          onChange={() => handleToggle('sms')}
        />
        <ToggleRow
          label="Share live location"
          checked={toggles.shareLocation}
          onChange={() => handleToggle('shareLocation')}
        />
      </section>

      {/* Thresholds section */}
      <section className="settings__section">
        <h2 className="settings__section-label">Thresholds (ppm)</h2>

        {thresholds.map((t) => (
          <div key={t.id} className="settings__row">
            <span
              className={`settings__row-label ${!t.enabled ? 'settings__row-label--disabled' : ''}`}
            >
              {t.label}
            </span>
            <div className="settings__row-actions">
              <span
                className={`settings__row-value ${!t.enabled ? 'settings__row-value--disabled' : ''}`}
              >
                {t.enabled ? t.value : 'OFF'}
              </span>
              <button
                className="settings__edit-btn"
                onClick={() => openEditor(t)}
                aria-label={`Edit ${t.label} threshold`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Device section */}
      <section className="settings__section">
        <h2 className="settings__section-label">Device</h2>

        {deviceInfo.map((d) => (
          <div key={d.label} className="settings__row">
            <span className="settings__row-label">{d.label}</span>
            <span
              className={`settings__row-value ${d.highlight ? 'settings__row-value--highlight' : ''}`}
            >
              {d.value}
            </span>
          </div>
        ))}
      </section>

      {/* Threshold editor modal */}
      {editingThreshold && (
        <div className="modal-overlay" onClick={closeEditor}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal__title">Edit threshold</h3>
            <p className="modal__subtitle">{editingThreshold.label}</p>

            <div className="modal__field">
              <label className="modal__label" htmlFor="threshold-value">
                Value (ppm)
              </label>
              <input
                id="threshold-value"
                type="number"
                className="modal__input"
                value={editingThreshold.value}
                min="0"
                step="any"
                disabled={!editingThreshold.enabled}
                onChange={(e) =>
                  setEditingThreshold((prev) => ({
                    ...prev,
                    value: parseFloat(e.target.value) || 0,
                  }))
                }
              />
            </div>

            <div className="modal__field modal__field--row">
              <span className="modal__label">Enabled</span>
              <button
                role="switch"
                aria-checked={editingThreshold.enabled}
                className={`toggle ${editingThreshold.enabled ? 'toggle--on' : ''}`}
                onClick={() =>
                  setEditingThreshold((prev) => ({
                    ...prev,
                    enabled: !prev.enabled,
                  }))
                }
              >
                <span className="toggle__thumb" />
              </button>
            </div>

            <div className="modal__actions">
              <button className="modal__btn modal__btn--cancel" onClick={closeEditor}>
                Cancel
              </button>
              <button className="modal__btn modal__btn--save" onClick={saveThreshold}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Toggle switch sub-component */
function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="settings__row">
      <span className="settings__row-label">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        className={`toggle ${checked ? 'toggle--on' : ''}`}
        onClick={onChange}
      >
        <span className="toggle__thumb" />
      </button>
    </div>
  );
}
