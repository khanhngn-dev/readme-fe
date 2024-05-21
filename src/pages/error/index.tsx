import { Button } from '@radix-ui/themes';
import {
  Link,
  useLocation,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

const ErrorPage = () => {
  const error: any = useRouteError();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(error);

  return (
    <main className="fixed inset-0 flex items-center justify-center p-3">
      <div className="max-w-sm w-full p-3">
        <img src="/images/warning.svg" className="w-8/12 mx-auto" />
        <h1 className="text-4xl mt-8 font-semibold text-center">
          {error.status || 'oops'}
        </h1>
        <h2 className="text-center mt-2 text-2xl">
          {error.statusText || error.message || 'something went wrong'}
        </h2>
        <p className="mt-2 text-center">
          {error.status === 404
            ? `"${location.pathname}" does not exist`
            : 'please try again later'}
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link to="/">to home</Link>
          </Button>
          <Button className="flex-1" onClick={() => navigate(-1)}>
            previous page
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
