import { AddressRequired } from '../../features/addresses/components/address-required';
import { AuthRequired } from '../../features/auth';

export function HomePage() {
  return (
    <AddressRequired>
      <AuthRequired>
        <div className="flex flex-col flex-1">
          Jogers?
          {/* {isLoading || !example ? <Loading /> : <Example example={example} />} */}
        </div>
      </AuthRequired>
    </AddressRequired>
  );
}
