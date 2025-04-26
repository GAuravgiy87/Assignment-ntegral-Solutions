import { createContext, useContext, useState, ReactNode } from 'react';

interface TravelInfo {
  destination: string;
  duration: string;
  travelingWith: string;
}

interface TravelContextType {
  travelInfo: TravelInfo;
  updateTravelInfo: (info: Partial<TravelInfo>) => void;
  activeView: 'onboarding' | 'dashboard' | 'details';
  setActiveView: (view: 'onboarding' | 'dashboard' | 'details') => void;
}

const defaultTravelInfo: TravelInfo = {
  destination: '',
  duration: '',
  travelingWith: '',
};

const TravelContext = createContext<TravelContextType>({
  travelInfo: defaultTravelInfo,
  updateTravelInfo: () => {},
  activeView: 'onboarding',
  setActiveView: () => {},
});

export function TravelContextProvider({ children }: { children: ReactNode }) {
  const [travelInfo, setTravelInfo] = useState<TravelInfo>(defaultTravelInfo);
  const [activeView, setActiveView] = useState<'onboarding' | 'dashboard' | 'details'>('onboarding');

  const updateTravelInfo = (info: Partial<TravelInfo>) => {
    setTravelInfo(prev => ({ ...prev, ...info }));
  };

  return (
    <TravelContext.Provider value={{ travelInfo, updateTravelInfo, activeView, setActiveView }}>
      {children}
    </TravelContext.Provider>
  );
}

export const useTravelContext = () => useContext(TravelContext);
