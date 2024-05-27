import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../../components/logo';
import { IconButton } from '../../../icon-button';
import { Icon } from '../../../icons';
import { Typography } from '../../../Typography';
import { useLogout } from '../../../../features/auth';

export function Header() {
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <header className="flex bg-primary-700 justify-center w-full border-b-gray-300 border-b p-3">
      <div className="flex flex-wrap items-center justify-center flex-1 relative gap-3 max-w-[1050px]">
        {location.pathname !== '/' && (
          <IconButton className="absolute left-0" onClick={() => navigate(-1)}>
            <Icon type="chevronLeft" className="text-white" size={5} />
          </IconButton>
        )}
        <Logo className="text-white" />
        <div onClick={logout}>
          <Typography className="text-white absolute right-0" size="h5">
            Sair
          </Typography>
        </div>
      </div>
    </header>
  );
}
