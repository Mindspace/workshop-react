import * as React from 'react';
import { useRouteError } from 'react-router-dom';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const ContactDashboard = React.lazy(() => import('@workshop/ui'));

export const router = createBrowserRouter([
  {
    // descendant routing for lazy-loaded, nested <routes></routes>
    path: '/contacts/*',
    element: (
      <React.Suspense fallback={<>...</>}>
        <ContactDashboard />
      </React.Suspense>
    ),
    errorElement: <AppErrorPage />,
  },
  {
    path: '*',
    element: <Navigate replace to="/contacts" />,
  },
]);

export function AppErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
