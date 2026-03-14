import { createContext, useContext, useState, useEffect } from 'react';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [historyItems, setHistoryItems] = useState([
    { group: 'Today', time: '16:42', severity: 'danger', text: 'Natural gas spike — 847 ppm (threshold: 500)' },
    { group: 'Today', time: '14:18', severity: 'warning', text: 'Smoke elevated — 34 %obs (threshold: 20)' },
    { group: 'Today', time: '12:05', severity: 'safe', text: 'All sensors normal — device connected' },
    { group: 'Today', time: '09:30', severity: 'warning', text: 'CO rising — 28 ppm (threshold: 35)' },
    { group: 'Today', time: '07:00', severity: 'safe', text: 'Device active — all clear' },
    { group: 'Yesterday', time: '21:15', severity: 'danger', text: 'Chlorine detected — 1.2 ppm (threshold: 0.5)' },
    { group: 'Yesterday', time: '14:30', severity: 'warning', text: 'CO elevated — 42 ppm — cleared after 4 min' },
    { group: 'Yesterday', time: '08:00', severity: 'safe', text: 'Device active — all clear' },
    { group: 'March 12', time: '19:47', severity: 'danger', text: 'Natural gas spike — 612 ppm (threshold: 500)' },
    { group: 'March 12', time: '19:43', severity: 'warning', text: 'Smoke elevated — 22 %obs (threshold: 20)' },
    { group: 'March 12', time: '11:00', severity: 'safe', text: 'Sensor calibration complete' },
    { group: 'March 12', time: '08:00', severity: 'safe', text: 'Device active — all clear' },
    { group: 'March 11', time: '16:10', severity: 'warning', text: 'CO rising — 31 ppm — cleared after 8 min' },
    { group: 'March 11', time: '08:00', severity: 'safe', text: 'Device active — all clear' },
  ]);

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Fire a random alarm every minute (60000 ms)
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newAlarmText = 'Critical sensor threshold breached. Calling your emergency contacts immediately.';
      
      setHistoryItems(prev => [
        { group: 'Today', time: timeStr, severity: 'danger', text: newAlarmText },
        ...prev
      ]);

      const toastId = Date.now();
      setToasts(prev => [...prev, { id: toastId, text: newAlarmText }]);
      
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== toastId));
      }, 10000); // Dismiss after 10 seconds
      
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(toast => toast.id !== id));

  return (
    <AlertContext.Provider value={{ historyItems, toasts, removeToast }}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlerts = () => useContext(AlertContext);
