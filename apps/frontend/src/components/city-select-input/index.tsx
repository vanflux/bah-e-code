import { useMemo } from 'react';
import { SelectInput, SelectInputProps } from '../select-input';
import { rsCities } from './cities';

interface Props extends Omit<SelectInputProps, 'options'> {}

export function CitySelectInput(props: Props) {
  const options = useMemo(() => {
    return rsCities.map((value) => ({
      value,
      label: value,
    }));
  }, []);

  return <SelectInput {...props} options={options} />;
}
