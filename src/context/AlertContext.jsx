import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const EMERGENCY_NUMBERS = [
  { region: 'United States / Canada', number: '911' },
  { region: 'European Union (Spain, France, Germany…)', number: '112' },
  { region: 'United Kingdom', number: '999' },
  { region: 'Australia', number: '000' },
  { region: 'Japan', number: '119' },
  { region: 'China', number: '120' },
  { region: 'India', number: '112' },
  { region: 'Brazil', number: '192' },
  { region: 'Mexico', number: '911' },
];

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [historyItems, setHistoryItems] = useState([
    { group: 'Today', time: '16:42', severity: 'danger', text: 'High levels of CH4 detected — 4000 ppm' },
    { group: 'Today', time: '14:18', severity: 'warning', text: 'Rising levels of CH4 detected — 3000 ppm' },
    { group: 'Today', time: '09:30', severity: 'warning', text: 'Rising levels of CO detected — 100 ppm' },
    { group: 'Today', time: '07:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'Yesterday', time: '21:15', severity: 'danger', text: 'High levels of CO detected — 150 ppm' },
    { group: 'Yesterday', time: '14:30', severity: 'warning', text: 'Rising levels of CO detected — 100 ppm' },
    { group: 'Yesterday', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 13', time: '19:43', severity: 'warning', text: 'Rising levels of CO2 detected — 3500 ppm' },
    { group: 'March 13', time: '08:23', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 12', time: '16:10', severity: 'warning', text: 'Rising levels of CO2 detected — 100 ppm' },
    { group: 'March 12', time: '08:23', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 11', time: '08:23', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 10', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 09', time: '09:06', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 08', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 07', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 06', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 05', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 04', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 03', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },
    { group: 'March 02', time: '08:00', severity: 'safe', text: 'Device callibrated — Clear air' },


  ]);

  const [selectedRegion, setSelectedRegion] = useState(EMERGENCY_NUMBERS[0]);

  const alarmCallbacks = useRef([]);

  const registerAlarmCallback = useCallback((cb) => {
    alarmCallbacks.current.push(cb);
    return () => {
      alarmCallbacks.current = alarmCallbacks.current.filter(c => c !== cb);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newAlarmText = 'Critical sensor threshold breached. Calling your emergency contacts immediately.';
      
      setHistoryItems(prev => [
        { group: 'Today', time: timeStr, severity: 'danger', text: newAlarmText },
        ...prev
      ]);

      // Notify subscribers (e.g. DashboardPage big modal)
      alarmCallbacks.current.forEach(cb => cb());
      
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AlertContext.Provider value={{        historyItems,
        registerAlarmCallback,
        selectedRegion,
        setSelectedRegion,
        EMERGENCY_NUMBERS,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export const useAlerts = () => useContext(AlertContext);
