import { Navigate } from 'react-router-dom';
import { routes } from '../../router/routes';

export function NotFoundPage() {
  return <Navigate to={routes.HOME()} />;
}
