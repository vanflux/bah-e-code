import { Typography } from '../Typography';
import { Icon } from '../icons';

interface AddressCard {
  name: string;
  id: string;
  onClick: () => void;
}

export const AddressCard = ({ name, onClick }: AddressCard) => {
  return (
    <div
      onClick={onClick}
      className="flex w-[333px] h-[50px] items-center bg-gray-100 justify-between pl-[10px] pr-[10px]  shadow-system rounded-xl "
    >
      <div className="flex gap-2">
        <Icon type="house" size={5} className="fill-red-500" />
        <Typography> {name} </Typography>
      </div>
      <Icon type="gps" size={5} />
    </div>
  );
};
