import * as Toast from '@radix-ui/react-toast';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';
import { noop } from '@/lib/common';

type Message = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  altText?: string;
} & Toast.ToastProviderProps;

type ToastContextType = {
  toast: (message: Message) => void;
  closeToast: () => void;
};

export const ToastContext = createContext<ToastContextType>({
  toast: noop,
  closeToast: noop,
});

type ToastContextProviderProps = {
  children: React.ReactNode;
};

const ToastProvider: React.FC<ToastContextProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { title, action, altText, description, icon, ...provider } =
    message || {};

  const toast = useCallback((message: Message) => {
    setOpen(false);
    setMessage(null);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpen(true);
      setMessage(message);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        closeToast: () => setOpen(false),
        toast,
      }}
    >
      <Toast.Provider swipeDirection="right" {...provider}>
        {children}
        <Toast.Root
          className={cn(
            'bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] flex items-center gap-3 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut',
          )}
          open={open}
          onOpenChange={(o) => {
            if (!o) {
              setOpen(false);
              setMessage(null);
            }
          }}
        >
          {icon && <div className="">{icon}</div>}
          <div className="flex-1">
            <Toast.Title className={cn('font-medium text-slate12 text-[15px]')}>
              {title}
            </Toast.Title>
            {description && (
              <Toast.Description className="m-0 mt-[5px] text-slate11 text-[13px] leading-[1.3]">
                {description}
              </Toast.Description>
            )}
          </div>
          {action && (
            <Toast.Action
              asChild
              altText={altText || title || 'Toast action'}
              className={cn('')}
            >
              {action}
            </Toast.Action>
          )}
        </Toast.Root>

        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
