import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../../components/logo';
import { IconButton } from '../../../icon-button';
import { Icon } from '../../../icons';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex bg-primary-700 justify-center w-full border-b-gray-300 border-b p-3">
      <div className="flex flex-wrap items-center justify-center flex-1 relative gap-3 max-w-[1050px]">
        {location.pathname !== '/' && (
          <IconButton className="absolute left-0" onClick={() => navigate(-1)}>
            <Icon type="chevronLeft" className="text-white" size={5} />
          </IconButton>
        )}
        <Logo className="text-white" />
      </div>
    </header>
  );
}
