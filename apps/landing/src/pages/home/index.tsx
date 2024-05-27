import { useMediaQuery } from '@uidotdev/usehooks';
import { Logo } from '../../components/logo';
import { cn } from '../../utils/cn';

export function HomePage() {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');

  const iframe = (
    <iframe
      allow="geolocation"
      className={cn('w-full h-full bg-white outline-none', !isSmallDevice && 'border border-black aspect-9/16 h-[80vh] rounded-xl')}
      src="https://bc.vanflux.dev"
    />
  );

  if (isSmallDevice) return iframe;

  return (
    <div className="bg-[#011724] flex flex-col flex-1 justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <Logo className="h-20" />
        {iframe}
      </div>
    </div>
  );
}
