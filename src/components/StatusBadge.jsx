import './StatusBadge.css';

export default function StatusBadge({ label, backgroundColor, textColor = '#fff' }) {
  return (
    <span
      className="status-badge"
      style={{ backgroundColor, color: textColor }}
    >
      {label.toUpperCase()}
    </span>
  );
}
