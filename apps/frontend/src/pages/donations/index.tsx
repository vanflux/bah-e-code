import { Link } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import { Icon } from '../../components/icons';
import { Loading } from '../../components/loading';
import { SupplyCategoryCard, useSupplyCategories } from '../../features/shelters';
import { routes } from '../../router/routes';

export const DonationsPage = () => {
  const { data: supplyCategories, isLoading } = useSupplyCategories();

  return (
    <div className="flex flex-col flex-1 gap-4 p-4">
      <div className="flex flex-col shadow-system p-3 rounded-xl">
        <div className="flex items-center gap-3">
          <Typography semibold size="h2">
            Doações
          </Typography>
          <Icon type="donation" size={8} />
        </div>
        <Typography semibold size="h4">
          Sua doação é muito importante! Clique abaixo para ver quais os abrigos mais próximos de você que necessitam de doações
        </Typography>
      </div>
      {isLoading ? (
        <div className="flex flex-col flex-1 justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {supplyCategories?.map((supplyCategory) => (
            <Link to={routes.SHELTERS_NEED_DONATION_CATEGORY(supplyCategory.supplyCategoryId)}>
              <SupplyCategoryCard supplyCategory={supplyCategory} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
