import { Typography } from '../../../../components/Typography';
import { Icon, IconType } from '../../../../components/icons';
import { SupplyCategoryDto } from '../../dtos';

interface Props {
  supplyCategory: SupplyCategoryDto;
  onClick?: () => void;
}

export function SupplyCategoryCard({ supplyCategory, onClick }: Props) {
  return (
    <div
      key={supplyCategory.supplyCategoryId}
      className="flex flex-col items-center justify-center h-[120px] gap-1 p-3 shadow-system rounded-xl cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <Icon size={12} className="text-red-500" type={(supplyCategory.icon as IconType) ?? 'shelter'} />
      <Typography size="h5" semibold align="center" className="break-words text-red-500">
        {supplyCategory.name}
      </Typography>
    </div>
  );
}
