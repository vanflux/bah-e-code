import { useEffect, useMemo, useState } from 'react';
import { TextInput } from '../../../components/text-input';
import { CitySelectInput } from '../../../components/city-select-input';
import { useCep } from '../hooks';
import { Loading } from '../../../components/loading';
import { SelectInput } from '../../../components/select-input';

export interface AddressFormData {
  name?: string;
  zipCode?: string;
  city?: string;
  street?: string;
  streetNumber?: number;
  neighbourhood?: string;
  alertsEnabled?: boolean;
  donationsEnabled?: boolean;
  volunteersEnabled?: boolean;
  hideBooleans?: boolean;
}

export interface Props {
  value: AddressFormData;
  hideBooleans?: boolean;
  onChange: (value: AddressFormData) => void;
}

// I know formikm yup and zod existence, but
// there is no reason to use no one of these
// things here, just more complexity added.
export function AddressForm({ value, hideBooleans, onChange }: Props) {
  const [name, setName] = useState(value.name);
  const [zipCodeInput, setZipCode] = useState(value.zipCode);
  const [city, setCity] = useState(value.city);
  const [street, setStreet] = useState(value.street);
  const [streetNumber, setStreetNumber] = useState(value.streetNumber);
  const [neighbourhood, setNeighbourhood] = useState(value.neighbourhood);
  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(true);
  const [donationsEnabled, setDonationsEnabled] = useState<boolean>(false);
  const [volunteersEnabled, setVolunteersEnabled] = useState<boolean>(false);

  const [nameTouch, setNameTouch] = useState(false);
  const [zipCodeInputTouch, setZipCodeTouch] = useState(false);
  const [cityTouch, setCityTouch] = useState(false);

  const { data: cepData, isLoading: cepIsLoading } = useCep(zipCodeInput);

  useEffect(() => {
    if (cepData?.city) setCity(cepData.city);
    if (cepData?.neighborhood) setNeighbourhood(cepData.neighborhood);
    if (cepData?.street) setStreet(cepData.street);
  }, [cepData]);

  const nameError = useMemo(() => {
    if (!name?.length) return 'Campo obrigatório';
  }, [name]);

  const zipCodeError = useMemo(() => {
    if (zipCodeInput?.includes('_')) return 'Cep inválido';
  }, [zipCodeInput]);

  const cityError = useMemo(() => {
    if (!city?.length) return 'Campo obrigatório';
  }, [city]);

  useEffect(() => {
    const zipCode = zipCodeInput?.replace(/[^\d]/g, '');
    onChange({ name, zipCode, city, neighbourhood, street, streetNumber, alertsEnabled, donationsEnabled, volunteersEnabled });
  }, [name, zipCodeInput, city, street, streetNumber, neighbourhood]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <p className="font-medium">Nome do local *</p>
        <TextInput
          className="w-full"
          value={name ?? ''}
          onChange={(e) => setName(e.target.value)}
          placeholder="Insira o nome do local"
          onBlur={() => setNameTouch(true)}
          errorMessage={nameTouch ? nameError : undefined}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <p className="font-medium">Cep</p>
          {cepIsLoading && <Loading size={1} />}
        </div>
        <TextInput
          className="w-full"
          mask="99999-999"
          value={zipCodeInput ?? ''}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Insira o seu cep"
          onBlur={() => setZipCodeTouch(true)}
          errorMessage={zipCodeInputTouch ? zipCodeError : undefined}
        />
      </div>
      <div className="flex flex-col">
        <p className="font-medium">Cidade *</p>
        <CitySelectInput
          className="w-full"
          value={city ?? ''}
          onChange={(value) => setCity(value)}
          placeholder="Insira a sua cidade"
          onBlur={() => setCityTouch(true)}
          errorMessage={cityTouch ? cityError : undefined}
        />
      </div>
      <div className="flex flex-col">
        <p className="font-medium">Bairro</p>
        <TextInput
          className="w-full"
          value={neighbourhood ?? ''}
          onChange={(e) => setNeighbourhood(e.target.value)}
          placeholder="Insira o seu bairro"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col flex-1">
          <p className="font-medium">Rua</p>
          <TextInput value={street ?? ''} onChange={(e) => setStreet(e.target.value)} placeholder="Insira a sua rua" />
        </div>
        <div className="flex flex-col w-20">
          <p className="font-medium">Número</p>
          <TextInput
            value={streetNumber ?? ''}
            onChange={(e) => {
              if (!e.target.value) return setStreetNumber(undefined);
              const num = parseInt(e.target.value);
              if (!isNaN(num)) return setStreetNumber(num);
            }}
            placeholder="Nº"
          />
        </div>
      </div>
      {!hideBooleans && (
        <>
          <div className="flex flex-col">
            <p className="font-medium">Alertas deste local</p>
            <SelectInput
              options={[
                { label: 'Quero receber notificações', value: 'true' },
                { label: 'Não quero', value: 'false' },
              ]}
              className="w-full"
              value={String(alertsEnabled)}
              onChange={(value) => setAlertsEnabled(value === 'true')}
            />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Abrigos precisando de doações</p>
            <SelectInput
              options={[
                { label: 'Quero receber notificações', value: 'true' },
                { label: 'Não quero', value: 'false' },
              ]}
              className="w-full"
              value={String(donationsEnabled)}
              onChange={(value) => setDonationsEnabled(value === 'true')}
            />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Abrigos precisando de voluntários</p>
            <SelectInput
              options={[
                { label: 'Quero receber notificações', value: 'true' },
                { label: 'Não quero', value: 'false' },
              ]}
              className="w-full"
              value={String(volunteersEnabled)}
              onChange={(value) => setVolunteersEnabled(value === 'true')}
            />
          </div>
        </>
      )}
    </div>
  );
}
