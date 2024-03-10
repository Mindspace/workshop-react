import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

export function useEscapeKey(handleClose: () => void) {
  const handleEscKey = useCallback(
    (event: { key: string }) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}

/**
 * On Escape keydowns auto-navigate to the given url
 * @param toUrl
 */
export const useNavigateOnEscape = (toUrl: string, block = false) => {
  const navigate = useNavigate();
  useEscapeKey(() => {
    !block && navigate(toUrl);
  });
};
