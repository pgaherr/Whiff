import './SensorCard.css';

export default function SensorCard({ name, value, unit, statusColor, progressValue = 0 }) {
  const formattedName = typeof name === 'string'
    ? name.split(/(\d+)/).map((part, i) => (/\d+/.test(part) ? <sub key={i}>{part}</sub> : part))
    : name;

  return (
    <div 
      className="sensor-card" 
      style={{ 
        border: `4px solid ${statusColor}`,
        background: 'var(--white)'
      }}
    >
      <div className="sensor-card__reading">
        <span className="sensor-card__name">{formattedName}</span>
        <span className="sensor-card__value">{value}</span>
        <span className="sensor-card__unit">{unit}</span>
      </div>
    </div>
  );
}
