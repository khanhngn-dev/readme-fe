import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

type OtpInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

const splitString = (str: string, length = 6) => {
  if (!str) return Array.from({ length }, () => '');
  if (str.length > length) {
    return str.slice(0, length).split('');
  }
  // Split the value into an array and fill the rest with empty strings
  return str
    .split('')
    .concat(Array.from({ length: length - str.length }, () => ''));
};

const OtpInput: React.FC<OtpInputProps> = ({
  value = '',
  error,
  onChange,
  disabled = false,
}) => {
  const [otp, setOtp] = useState(() => splitString(value));
  const inputs = useRef<HTMLInputElement[]>([]);

  const onOtpChange = (newOtp: string, index: number) => {
    if (index < 0 || index > 5) return;
    // Ignore the last input if the value is already filled
    if (index === 5 && newOtp && otp[index]) return;
    if (newOtp.length > 1) {
      // More than one character
      const splitValues = newOtp.split('');
      const cloned = [...otp];

      // Replace the value at the index with the split values
      splitValues.forEach((v, i) => {
        const temp = Number(v);
        cloned[index + i] = isNaN(temp) ? '' : v;
      });
      setOtp(cloned);
      onChange?.(cloned.join(''));

      // Focus on the last input
      inputs.current[Math.min(splitValues.length, 5)].focus();
    } else {
      // Single character
      const cloned = [...otp];
      const temp = Number(newOtp);
      cloned[index] = isNaN(temp) ? '' : newOtp;

      setOtp(cloned);
      onChange?.(cloned.join(''));

      // Focus on the next input
      if (newOtp && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !e.currentTarget.value) {
      const prevElm = inputs.current[Math.max(0, index - 1)];
      if (prevElm) {
        prevElm.focus();
      }
    }
  };

  useEffect(() => {
    setOtp((prev) => (prev.join('') !== value ? splitString(value) : prev));
  }, [value]);

  return (
    <div className="flex gap-2 h-10">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) {
              inputs.current.push(el);
            }
          }}
          type="number"
          value={otp[index]}
          disabled={disabled}
          className={cn(
            'h-full text-center text-xl aspect-square p-2 border rounded-xl',
            'focus:outline-2 focus:-outline-offset-1 focus:outline-blue8',
            'disabled:text-black/40 disabled:border-black/10',
            otp[index] && 'border-blue8',
            error && 'border-red-500 focus:outline-red-500',
          )}
          onChange={(e) => onOtpChange(e.target.value, index)}
          onKeyDown={(e) => onKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
