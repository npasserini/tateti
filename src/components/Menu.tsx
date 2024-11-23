import React, { useState } from 'react';
import '../styles/components/Menu.scss';

interface MenuProps {
  onLevelChange: (level: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onLevelChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container">
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <ul className="menu">
          <li onClick={() => onLevelChange('Fácil')}>Fácil</li>
          <li onClick={() => onLevelChange('Intermedio')}>Intermedio</li>
          <li onClick={() => onLevelChange('Difícil')}>Difícil</li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
