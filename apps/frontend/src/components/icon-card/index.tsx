import { Typography } from '../Typography';
import { Icon, IconType } from '../icons';

interface IconCardProps {
  iconType: IconType;
  iconClassName?: string;
  text: string;
  navigate: () => void;
}

export const IconCard = ({ iconType, iconClassName, text, navigate }: IconCardProps) => {
  return (
    <div
      onClick={() => navigate()}
      className="flex flex-col overflow-hidden gap-3 justify-center items-center shadow-system rounded-xl h-[100px]"
    >
      <Icon type={iconType} size={8} className={iconClassName} />
      <Typography className="break-word" size="h4">
        {text}
      </Typography>
    </div>
  );
};
