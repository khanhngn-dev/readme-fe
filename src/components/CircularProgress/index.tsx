import { cn } from '@/lib/cn';

type CircularProgressProps = React.SVGProps<SVGSVGElement> & {
  value?: number;
  children?: React.ReactNode;
  strokeWidth?: number;
  classNames?: {
    root?: string;
    circle?: string;
  };
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  strokeWidth = 2,
  classNames,
  className,
  ...props
}) => {
  const size = 100;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;

  const strokeDashoffset = circumference * (1 - (props.value || 0) / 100);

  return (
    <div className={cn('relative', classNames?.root)}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={cn('w-8 h-8', className)}
        {...props}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          strokeWidth={strokeWidth}
          className="stroke-gray3"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${center} ${center})`}
          className="transition-[stroke-dashoffset] stroke-blue9"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {props.children}
      </div>
    </div>
  );
};

export default CircularProgress;
