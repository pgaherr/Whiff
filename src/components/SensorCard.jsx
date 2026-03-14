import './SensorCard.css';

export default function SensorCard({ name, value, unit, statusColor, progressValue = 0 }) {
  return (
    <div className="sensor-card">
      <span className="sensor-card__name">{name}</span>

      <div className="sensor-card__reading">
        <span className="sensor-card__value">{value}</span>
        <span className="sensor-card__unit">{unit}</span>
      </div>

      <div
        className="sensor-card__bar-track"
        style={{ backgroundColor: `${statusColor}33` }}
      >
        <div
          className="sensor-card__bar-fill"
          style={{
            width: `${Math.min(progressValue * 100, 100)}%`,
            backgroundColor: statusColor,
          }}
        />
      </div>
    </div>
  );
}
