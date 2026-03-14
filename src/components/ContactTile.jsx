import StatusBadge from './StatusBadge';
import './ContactTile.css';

export default function ContactTile({
  name,
  relationship,
  initials,
  avatarColor,
  statusLabel,
  statusBgColor,
}) {
  const isPending = statusLabel.toLowerCase().includes('pending');

  return (
    <div className="contact-tile">
      <div
        className="contact-tile__avatar"
        style={{
          backgroundColor: `${avatarColor}1A`,
          color: avatarColor,
        }}
      >
        {initials}
      </div>

      <div className="contact-tile__info">
        <span className="contact-tile__name">{name}</span>
        <span className="contact-tile__relationship">{relationship}</span>
      </div>

      <StatusBadge
        label={statusLabel}
        backgroundColor={statusBgColor}
        textColor={isPending ? '#000' : '#14532d'}
      />
    </div>
  );
}
