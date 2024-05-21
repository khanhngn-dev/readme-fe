import React from 'react';

import { cn } from '@/lib/cn';

type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const Divider: React.FC<DividerProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('flex items-center w-full', className)} {...props}>
      <div className="flex-1 bg-black/20 h-[1px]"></div>
      {children && <div className="px-3">{children}</div>}
      <div className="flex-1 bg-black/20 h-[1px]"></div>
    </div>
  );
};

export default Divider;
