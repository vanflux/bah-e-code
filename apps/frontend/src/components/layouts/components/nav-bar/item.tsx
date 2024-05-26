import { Link, matchPath, useLocation } from 'react-router-dom';
import { Icon, IconType } from '../../../icons';
import { Typography } from '../../../Typography';
import { cn } from '../../../../utils/cn';

interface Props {
  label: string;
  destination: string;
  iconType: IconType;
}

export function NavBarItem({ label, destination, iconType }: Props) {
  const { pathname } = useLocation();
  const active = !!matchPath(destination, pathname);

  return (
    <Link
      to={destination}
      className={cn('flex flex-col flex-1 items-center overflow-hidden', active ? 'text-primary-400' : 'text-gray-500')}
    >
      <Icon size={8} type={iconType} />
      <Typography align="center" size="h4">
        {label}
      </Typography>
    </Link>
  );
}
