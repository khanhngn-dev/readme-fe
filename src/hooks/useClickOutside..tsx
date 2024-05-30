import { useCallback, useEffect } from 'react';

type Event = MouseEvent;
type Ref<T extends HTMLElement> = React.RefObject<T>;
type Callback = (event: Event) => void;

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: Ref<T>,
  callback: Callback,
) => {
  const handleClick = useCallback(
    (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(e);
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};

export default useClickOutside;
