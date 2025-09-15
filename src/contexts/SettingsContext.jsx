import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const defaultX = 40;
const defaultY = 80;
const defaultMovementStyle = 'curve';

const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export function SettingsProvider({ children }) {
  const [movementStyle, setMovementStyle] = useState(() => 
    loadFromStorage('maple-movement-style', defaultMovementStyle)
  );
  const [xSpacing, setXSpacing] = useState(() => 
    loadFromStorage('maple-x-spacing', defaultX)
  );
  const [ySpacing, setYSpacing] = useState(() => 
    loadFromStorage('maple-y-spacing', defaultY)
  );

  useEffect(() => {
    saveToStorage('maple-movement-style', movementStyle);
  }, [movementStyle]);

  useEffect(() => {
    saveToStorage('maple-x-spacing', xSpacing);
  }, [xSpacing]);

  useEffect(() => {
    saveToStorage('maple-y-spacing', ySpacing);
  }, [ySpacing]);

  const resetSpacing = () => {
    setXSpacing(defaultX);
    setYSpacing(defaultY);
  };

  const resetMovementStyle = () => {
    setMovementStyle(defaultMovementStyle);
  };

  const resetAllSettings = () => {
    setMovementStyle(defaultMovementStyle);
    setXSpacing(defaultX);
    setYSpacing(defaultY);
  };

  const value = {
    movementStyle,
    setMovementStyle,
    xSpacing,
    setXSpacing,
    ySpacing,
    setYSpacing,
    resetSpacing,
    resetMovementStyle,
    resetAllSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
