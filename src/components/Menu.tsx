import React, { useState } from 'react';
import '../styles/components/Menu.scss';

import type { Level } from '../bot';

interface MenuProps {
  onLevelChange: (level: Level) => void;
}

const Menu: React.FC<MenuProps> = ({ onLevelChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Estado para manejar la animación de cierre

  const toggleMenu = () => {
    if (isOpen) {
      setIsClosing(true); // Inicia la animación de cierre
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false); // Resetea el estado
      }, 300); // Tiempo de la animación
    } else {
      setIsOpen(true);
    }
  };

  const handleLevelChange = (level: Level) => {
    onLevelChange(level);
    setIsClosing(true); // Inicia la animación de cierre
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false); // Resetea el estado
    }, 300); // Tiempo de la animación
  };

  return (
    <div
      className={`menu-container ${isOpen ? 'open' : ''} ${
        isClosing ? 'closing' : ''
      }`}
    >
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <ul className="menu">
          <li onClick={() => handleLevelChange('Fácil')}>Fácil</li>
          <li onClick={() => handleLevelChange('Intermedio')}>Intermedio</li>
          <li onClick={() => handleLevelChange('Difícil')}>Difícil</li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
