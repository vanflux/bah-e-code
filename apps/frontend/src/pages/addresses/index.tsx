import { Fragment, useEffect, useMemo, useState } from 'react';
import { AddressCard } from '../../components/address-card';
import { Loading } from '../../components/loading';
import { Modal } from '../../components/modal';
import { TextInput } from '../../components/text-input';
import { AddressDto, createAddress, useAddresses } from '../../features/addresses';
import { Address } from 'cluster';
import { AddressForm, AddressFormData } from '../../features/addresses/components/address-form';
import { Button } from '../../components/button';
import { patchAddress } from '../../features/addresses/api/patch-address';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface AddressData {
  address: AddressFormData;
  addressId: string;
  action: 'create' | 'edit';
}

export const AddressesPage = () => {
  const { data: addresses, isLoading } = useAddresses();
  const [addressData, setAddress] = useState<AddressData>();
  const [filterText, setFilterText] = useState('');
  const queryClient = useQueryClient();

  const filteredAddresses = useMemo(() => {
    const filter = filterText.trim().toUpperCase();
    if (!filterText.trim().length) return addresses;
    else {
      return addresses?.filter((it) => it.zipCode.toUpperCase().includes(filter) || it.name.toUpperCase().includes(filter));
    }
  }, [addresses, filterText]);

  return (
    <div className="flex justify-center">
      <div className="flex-col text-center">
        <div className="h-[20px]" />
        <h1 className="text-sm font-semibold text-center"> Procurar endereço </h1>
        <div className="h-[20px]" />
        <div className="flex justify-center">
          <TextInput className="max-w-[200px]" placeholder="Digite nome ou cep" onChange={(e) => setFilterText(e.target.value)} />
        </div>
        <div className="h-[20px]" />
        <div className="flex-col gap-1">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center flex-1">
              <Loading />
            </div>
          ) : (
            <>
              <Button
                onClick={async () => {
                  setAddress({ address: { streetNumber: 0 }, addressId: '', action: 'create' });
                }}
              >
                Cadastrar endereço
              </Button>
              <div className="h-[20px]" />

              <div className="flex flex-col gap-3">
                {filteredAddresses?.map((it) => (
                  <AddressCard
                    key={it.addressId}
                    id={it.addressId}
                    name={it.name}
                    onClick={() =>
                      setAddress({
                        address: {
                          city: it.city,
                          name: it.name,
                          neighbourhood: it.neighbourhood,
                          street: it.street,
                          zipCode: it.zipCode,
                          streetNumber: it.streetNumber != null ? Number.parseInt(it.streetNumber) : undefined,
                          alertsEnabled: it.alertsEnabled,
                          donationsEnabled: it.donationsEnabled,
                          volunteersEnabled: it.volunteersEnabled,
                        },
                        addressId: it.addressId,
                        action: 'edit',
                      })
                    }
                  />
                ))}
              </div>
              <Modal open={!!addressData} onOpenChange={() => setAddress(undefined)} className="gap-3 pt-6">
                {addressData && (
                  <>
                    <AddressForm
                      value={addressData.address}
                      onChange={(data: AddressFormData) =>
                        setAddress({
                          address: data,
                          addressId: addressData.addressId,
                          action: addressData.action,
                        })
                      }
                    />
                    <div className="h-[20px]>" />
                    <Button
                      onClick={async () => {
                        if (!addressData.address.city || !addressData.address.name) {
                          toast.error('Preencha os campos antes de salvar');
                        } else if (addressData.action === 'create') {
                          await createAddress({
                            name: addressData.address.name,
                            city: addressData.address.city!,
                            street: addressData.address.street,
                            zipCode: addressData.address.zipCode,
                            alertsEnabled: addressData.address.alertsEnabled,
                            donationsEnabled: addressData.address.donationsEnabled,
                            neighbourhood: addressData.address.neighbourhood,
                            streetNumber: addressData.address.streetNumber,
                            volunteersEnabled: addressData.address.volunteersEnabled,
                          }).then(() => {
                            setAddress(undefined);
                            toast.success('Endereço cadastrado!');
                            queryClient.invalidateQueries();
                          });
                        } else {
                          await patchAddress(addressData.addressId, addressData.address).then(() => {
                            setAddress(undefined);
                            toast.success('Endereço atualizado!');
                            queryClient.invalidateQueries();
                          });
                        }
                      }}
                    >{`${addressData.action === 'create' ? 'Salvar endereço' : 'Salvar alteração'}`}</Button>
                  </>
                )}
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
