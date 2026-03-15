import { useEffect, useState } from 'react';
import ContactTile from '../components/ContactTile';
import MapWidget from '../components/MapWidget';
import SensorCard from '../components/SensorCard';
import { useAlerts } from '../context/AlertContext';
import './DashboardPage.css';

const DANGER_RED = '#EF4444';
const SAFE_GREEN = '#166534';
const WARNING_ORANGE = '#D97706';
const BADGE_GREEN_BG = '#DCFCE7';
const BADGE_GREY_BG = '#F3F4F6';



const contacts = [
  { name: 'Maria Dawn', relationship: 'Mother', initials: 'MD', avatarColor: '#3B82F6', statusLabel: 'SMS sent', statusBgColor: BADGE_GREEN_BG },
  { name: 'Jonas Lee', relationship: 'Roommate', initials: 'JL', avatarColor: '#22C55E', statusLabel: 'SMS sent', statusBgColor: BADGE_GREEN_BG },
];

export default function DashboardPage() {
  const [showAlert, setShowAlert] = useState(false);
  const [hasAcceptedAlarm, setHasAcceptedAlarm] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { registerAlarmCallback, selectedRegion } = useAlerts();

  useEffect(() => {
    const unsubscribe = registerAlarmCallback(() => {
      setHasTriggered(true);
      setShowAlert(true);
    });
    return unsubscribe;
  }, [registerAlarmCallback]);

  const currentSensors = [
    { name: <>CO</>, value: hasTriggered ? '152' : '145', unit: 'ppm', statusColor: hasTriggered ? DANGER_RED : WARNING_ORANGE, progressValue: 1 },
    { name: <>CH<sub>4</sub></>, value: '430', unit: 'ppm', statusColor: SAFE_GREEN, progressValue: 1 },
    { name: <>CO<sub>2</sub></>, value: '1900', unit: 'ppm', statusColor: SAFE_GREEN, progressValue: 1 },
    { name: <>VOC</>, value: '0.5', unit: 'ppm', statusColor: WARNING_ORANGE, progressValue: 1 },
  ];

  const handleAcceptAlarm = () => {
    setShowAlert(false);
    setHasAcceptedAlarm(true);
  };

  return (
    <div className="dashboard">
      {/* Header row */}
      <div className="dashboard__header">
        <h1 className="dashboard__title">LIVE DATA</h1>
      </div>

      {/* Alert banner */}
      {showAlert && (
        <div className="dashboard__alert-overlay">
          <div className="dashboard__alert dashboard__alert--modal">
            <div className="dashboard__alert-icon dashboard__alert-icon--large">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className="dashboard__alert-text dashboard__alert-text--large">
              <span className="dashboard__alert-title">DANGER!</span>
              <span className="dashboard__alert-msg">High levels of CO detected</span>
              <span className="dashboard__alert-action">Please, evacuate</span>
            </div>
            <button
              className="dashboard__alert-accept-btn"
              onClick={handleAcceptAlarm}
            >
              ACCEPT
            </button>
          </div>
        </div>
      )}

      {/* Sensor cards grid */}
      <div className="dashboard__sensors">
        {currentSensors.map((s) => (
          <SensorCard key={s.name} {...s} />
        ))}
      </div>

      {/* Map */}
      <MapWidget />

      {/* Post-alarm active actions */}
      {hasAcceptedAlarm && (
        <>
          <p className="dashboard__contacts-label">Emergency contacts notified</p>
          <div className="dashboard__calling-card">
            <div className="dashboard__calling-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="dashboard__calling-info">
              <span className="dashboard__calling-status">Calling emergency telephone number</span>
            </div>
            <span className="dashboard__calling-number">{selectedRegion?.number || '911'}</span>
          </div>

          <div className="dashboard__contacts-card">
            {contacts.map((c) => (
              <ContactTile key={c.name} {...c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
