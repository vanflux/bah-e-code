import { ReactNode, useState } from 'react';
import { useAddresses, useCreateAddress } from '../hooks';
import { Modal } from '../../../components/modal';
import { AddressForm, AddressFormData } from './address-form';
import { useAuth } from '../../auth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  children?: ReactNode;
}

export function AddressRequired({ children }: Props) {
  const { authenticated } = useAuth();
  const { data: addresses, isLoading } = useAddresses();
  const [addressFormData, setAddressFormData] = useState<AddressFormData>({
    name: 'Meu endereço',
  });
  const { mutateAsync: createAddress } = useCreateAddress();
  const queryClient = useQueryClient();

  const handleContinue = async () => {
    if (!addressFormData?.city) return;
    try {
      await createAddress({
        name: addressFormData.name,
        city: addressFormData.city,
        neighbourhood: addressFormData.neighbourhood,
        street: addressFormData.street,
        streetNumber: addressFormData.streetNumber,
        zipCode: addressFormData.zipCode,
        alertsEnabled: addressFormData.alertsEnabled,
        donationsEnabled: addressFormData.donationsEnabled,
        volunteersEnabled: addressFormData.volunteersEnabled,
      });
      toast.success('Endereço cadastrado!');
      queryClient.invalidateQueries();
    } catch {
      toast.error('Falha ao cadastrar o endereço');
    }
  };

  const canContinue = !!addressFormData.city;

  return (
    <>
      <Modal open={authenticated && !isLoading && !addresses?.length} hideClose className="gap-3">
        <h1 className="text-sm font-semibold text-center">Para continuar, insira o seu local</h1>
        <AddressForm value={addressFormData} hideBooleans onChange={setAddressFormData} />
        <button className="bg-primary-500 disabled:bg-gray-300 py-2 text-white rounded-xl" disabled={!canContinue} onClick={handleContinue}>
          Continuar
        </button>
      </Modal>
      {children}
    </>
  );
}
