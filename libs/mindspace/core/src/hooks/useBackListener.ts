import { useEffect } from 'react';
import { Location, NavigationType, useLocation, useNavigationType } from 'react-router-dom';

export type BackListener = (location: Location) => void;

export const useBackListener = (callback: BackListener) => {
  const location: Location = useLocation();
  const navType: NavigationType = useNavigationType();

  useEffect(() => {
    if (navType === 'POP' && location.key !== 'default') {
      callback(location);
    }
  }, [navType, location, callback]);
};
