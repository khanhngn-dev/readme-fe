import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

type AuthenticatedProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const Authenticated: React.FC<AuthenticatedProps> = ({
  children,
  redirectTo = '/auth',
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`${redirectTo}?redirect_to=${location.pathname}`}
        replace={true}
      />
    );
  }

  return children;
};

export default Authenticated;
