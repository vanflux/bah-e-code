import { Icon, IconType } from '../icons';

interface IconCardProps {
  iconType: IconType;
  iconColor: 'blue' | 'red';
  text: string;
  navigate: () => void;
  iconSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 20;
}

export const IconCard = ({ iconType, iconColor, text, iconSize, navigate }: IconCardProps) => {
  return (
    <div onClick={() => navigate()} className="w-[108px] h-[104px] flex justify-center border border-gray-300 shadow-lg rounded-lg">
      <div className="flex-col content-center">
        <div className="flex justify-center">
          <div className="h-[20px]"></div>
          <Icon type={iconType} size={iconSize || 6} className={`${iconColor === 'blue' ? 'fill-primary-800' : 'fill-red-500'}`} />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};
