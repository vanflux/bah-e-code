import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';
import { cn } from '../../utils/cn';

interface Props {
  className?: string;
}

export function Logo({ className }: Props) {
  return (
    <Link to={routes.HOME()}>
      <img src="/assets/images/logo.webp" className={cn('h-10', className)} />
    </Link>
  );
}
