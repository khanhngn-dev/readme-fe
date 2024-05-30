import { Avatar, AvatarProps } from '@radix-ui/themes';

import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

type UserProps = Omit<AvatarProps, 'fallback'> & {
  fallback?: React.ReactNode;
};

const User: React.FC<UserProps> = ({ fallback, className, ...props }) => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Avatar
      className={cn('rounded-xl h-8 w-8', className)}
      fallback={fallback ?? user.email![0]}
      src={user.avatar ?? undefined}
      {...props}
    />
  );
};

export default User;
