import { Typography } from '../Typography';
import { Icon, IconType } from '../icons';

interface IconCardProps {
  iconType: IconType;
  iconColor: 'blue' | 'red';
  text: string;
  navigate: () => void;
}

export const IconCard = ({ iconType, iconColor, text, navigate }: IconCardProps) => {
  return (
    <div
      onClick={() => navigate()}
      className="flex flex-col overflow-hidden gap-3 justify-center items-center shadow-system rounded-xl h-[100px]"
    >
      <Icon type={iconType} size={8} className={`${iconColor === 'blue' ? 'fill-primary-800' : 'fill-red-500'}`} />
      <Typography className="break-word" size="h4">
        {text}
      </Typography>
    </div>
  );
};
