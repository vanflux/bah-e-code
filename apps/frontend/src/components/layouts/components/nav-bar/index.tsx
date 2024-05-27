import { useEffect, useState } from 'react';
import { routes } from '../../../../router/routes';
import { NavBarItem } from './item';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

export const NavBar = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!['android', 'ios'].includes(Capacitor.getPlatform())) return;

    Keyboard.addListener('keyboardWillShow', () => setHide(() => true));
    Keyboard.addListener('keyboardWillHide', () => setHide(() => false));
  }, []);

  if (hide) return null;

  return (
    <nav className="flex justify-evenly w-full shadow-[0px_-1px_4px_rgba(0,0,0,0.25)] p-3">
      <NavBarItem destination={routes.HOME()} label="Início" iconType="house" />
      <NavBarItem destination={routes.SHELTERS()} label="Abrigos" iconType="shelter" />
      <NavBarItem destination={routes.MY_ADDRESSES()} label="Endereços" iconType="gps" />
    </nav>
  );
};
