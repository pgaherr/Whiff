import { useAlerts } from '../context/AlertContext';
import './GlobalAlerts.css';

export default function GlobalAlerts() {
  const { toasts, removeToast } = useAlerts();

  if (toasts.length === 0) return null;

  return (
    <div className="global-alerts">
      {toasts.map(toast => (
        <div key={toast.id} className="global-alert-balloon danger">
          <div className="global-alert-balloon__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div className="global-alert-balloon__content">
            <strong>DANGER!</strong>
            <p>{toast.text}</p>
          </div>
          <button className="global-alert-balloon__close" onClick={() => removeToast(toast.id)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
