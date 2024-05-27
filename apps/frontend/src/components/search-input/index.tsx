import { Icon } from '../icons';

interface Props {
  onChange?: (value: string) => void;
  value: string;
}

export function SearchInput({ value, onChange }: Props) {
  return (
    <div className="shadow-system rounded-full flex items-center pl-4 h-14">
      <input
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        type="text"
        placeholder="Buscar abrigo por nome ou endereço"
        className="grow outline-none"
      />
      <div className="w-14 h-14 flex items-center justify-center">
        <Icon type="search" size={4} />
      </div>
    </div>
  );
}
