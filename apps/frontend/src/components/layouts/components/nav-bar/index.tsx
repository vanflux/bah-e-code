import { routes } from '../../../../router/routes';
import { NavBarItem } from './item';

export const NavBar = () => {
  return (
    <nav className="flex justify-evenly w-full shadow-[0px_-1px_4px_rgba(0,0,0,0.25)] px-4 py-6 sticky top-[100vh]">
      <NavBarItem destination={routes.HOME()} label="Início" iconType="house" />
      <NavBarItem destination={routes.SHELTERS()} label="Abrigos" iconType="shelter" />
      <NavBarItem destination={routes.MY_ADDRESSES()} label="Endereços" iconType="dogFoot" />
    </nav>
  );
};
