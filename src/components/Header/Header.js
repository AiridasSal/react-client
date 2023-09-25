import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher'
const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="header">
      <h1 className='logo font-bold font-large'>{t('EcoTrip')}</h1>
      <nav className="nav">
      <LanguageSwitcher />
        <ul className="flex items-center space-x-4">
          <li>
            <NavLink
              to="/order"
              className="nav-link font medium"
            >
               {t('New')} {t('Order')}
              
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className="nav-link font medium"
            >
              {t('Logout')}
              
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/order-table"
              className="nav-link font medium"
            >
              {t('Orders')}
              
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
