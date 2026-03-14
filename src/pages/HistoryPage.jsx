import { useAlerts } from '../context/AlertContext';
import './HistoryPage.css';

const SEVERITY = {
  danger: '#EF4444',
  warning: '#D97706',
  safe: '#166534',
};

export default function HistoryPage() {
  const { historyItems } = useAlerts();

  // Group the dynamic history items by group name
  const groupedData = historyItems.reduce((acc, item) => {
    let groupLabel = item.group;
    if (!acc[groupLabel]) acc[groupLabel] = [];
    acc[groupLabel].push(item);
    return acc;
  }, {});

  // Convert grouped object to array of groups for rendering
  const events = Object.entries(groupedData).map(([group, items]) => ({
    group,
    items,
  }));

  return (
    <div className="history">
      <h1 className="history__title">Alert history</h1>

      {events.map((group) => (
        <section key={group.group} className="history__group">
          <h2 className="history__group-label">{group.group}</h2>

          <div className="history__list">
            {group.items.map((event, i) => (
              <div key={i} className="history__event">
                <span
                  className="history__dot"
                  style={{ backgroundColor: SEVERITY[event.severity] }}
                  aria-label={event.severity}
                />
                <span className="history__time">{event.time}</span>
                <span className="history__text">{event.text}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
