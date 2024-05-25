import { NavLink } from 'react-router-dom';
import { routes } from '../../router/routes';
import './index.css';
const Navbar = () => {
  return (
    <nav className="flex justify-evenly w-full bg-gray-200 p-2 pt-5 sticky top-[100vh]">
      <a>
        <NavLink to={routes.HOME()}>Home</NavLink>
      </a>
      <a>
        <NavLink to={routes.SHELTERS()}>Abrigos</NavLink>
      </a>
      <a>
        <NavLink to={routes.MY_ADDRESSES()}>Endereços</NavLink>
      </a>
    </nav>
  );
};

export default Navbar;
