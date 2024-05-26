import { useCurrentLocation } from '../../features/current-location';
import { SelectInput } from '../select-input';

export default function LocationSelectInput() {
  const { completeAddresses, type, setType } = useCurrentLocation();

  return (
    <SelectInput
      value={type}
      onChange={setType}
      placeholder="Local atual"
      options={[
        { label: 'Minha localização (GPS)', value: 'gps' },
        ...(completeAddresses?.map((item) => ({ label: item.name, value: item.addressId })) ?? []),
      ]}
    />
  );
}
