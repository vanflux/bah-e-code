import { useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { IconCard } from '../../components/icon-card';
import { AddressRequired } from '../../features/addresses/components/address-required';
import { AuthRequired } from '../../features/auth';
import { Typography } from '../../components/Typography';
import { WarnCarousel } from '../../features/warns';
import { useState } from 'react';
import { WaterLevelModal } from '../../features/rivers';

export function HomePage() {
  const navigate = useNavigate();
  const [waterLevelOpen, setWaterLevelOpen] = useState(false);

  return (
    <AddressRequired>
      <AuthRequired>
        <div className="flex flex-col gap-5">
          <WaterLevelModal open={waterLevelOpen} onOpenChange={setWaterLevelOpen} />
          <div className="flex flex-col px-3 py-1 overflow-hidden">
            <WarnCarousel />
          </div>
          <div className="flex flex-col px-3 gap-3">
            <Typography size="h2" className="font-bold">
              Menu
            </Typography>
            <div className="grid grid-cols-3 gap-3">
              <IconCard text="Abrigos" navigate={() => navigate(routes.SHELTERS())} iconClassName="text-primary-500" iconType="shelter" />
              <IconCard text="Alertas" navigate={() => navigate(routes.WARNS())} iconClassName="text-red-500" iconType="alert" />
              {/* <IconCard
                text="Notificações"
                navigate={() => navigate(routes.NOTIFICATIONS())}
                iconClassName="text-primary-500"
                iconType="bell"
              /> */}
              <IconCard text="Doações" navigate={() => navigate(routes.DONATIONS())} iconType="donation" />
              <IconCard text="Voluntários" navigate={() => navigate(routes.VOLUNTEERS())} iconType="volunteer" />
              <IconCard text="Nível do rio" navigate={() => setWaterLevelOpen(true)} iconType="chart" />
            </div>
          </div>
        </div>
      </AuthRequired>
    </AddressRequired>
  );
}
