import { cn } from '../../utils/cn';
import { AlertIcon } from './types/alert';
import { ArrowLeftIcon } from './types/arrow-left';
import { CheckIcon } from './types/check';
import { ChevronDownIcon } from './types/chevron-down';
import { ChevronUpIcon } from './types/chevron-up';
import { BellIcon } from './types/bell';
import { CloseIcon } from './types/close';
import { ContactIcon } from './types/contact';
import { DogFootIcon } from './types/dog-foot';
import { GpsIcon } from './types/gps';
import { PeopleIcon } from './types/people';
import { SearchIcon } from './types/search';
import { DonationIcon } from './types/donation';
import { HouseIcon } from './types/house';
import { ShelterIcon } from './types/shelter';
import { VolunteerIcon } from './types/volunteer';
import { ChevronRightIcon } from './types/chevron-right';
import { ChevronLeftIcon } from './types/chevron-left';
import { CenterLocationIcon } from './types/center-location';

interface Props {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 20;
  type: IconType;
  className?: string;
  onClick?: () => void;
}

const types = {
  arrowLeft: ArrowLeftIcon,
  check: CheckIcon,
  chevronDown: ChevronDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  chevronUp: ChevronUpIcon,
  close: CloseIcon,
  gps: GpsIcon,
  dogFoot: DogFootIcon,
  people: PeopleIcon,
  contact: ContactIcon,
  search: SearchIcon,
  alert: AlertIcon,
  house: HouseIcon,
  volunteer: VolunteerIcon,
  shelter: ShelterIcon,
  bell: BellIcon,
  donation: DonationIcon,
  centerLocation: CenterLocationIcon,
} as const;

export type IconType = keyof typeof types;

export const Icon = ({ size = 2, type, className, onClick }: Props) => {
  const Component = types[type];
  if (!Component) return null;
  const sizeClasses = {
    1: 'h-1 min-w-1 min-h-1',
    2: 'h-2 min-w-2 min-h-2',
    3: 'h-3 min-w-3 min-h-3',
    4: 'h-4 min-w-4 min-h-4',
    5: 'h-5 min-w-5 min-h-5',
    6: 'h-6 min-w-6 min-h-6',
    7: 'h-7 min-w-7 min-h-7',
    8: 'h-8 min-w-8 min-h-8',
    9: 'h-9 min-w-9 min-h-9',
    10: 'h-10 min-w-10 min-h-10',
    20: 'h-20 min-w-20 min-h-20',
  }[size];
  return (
    <div className={cn(sizeClasses, className)} onClick={onClick}>
      {<Component />}
    </div>
  );
};
