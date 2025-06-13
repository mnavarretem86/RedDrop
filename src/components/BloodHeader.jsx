import React, { useState } from 'react';
import {
  Droplet,
  Home,
  Users,
  ClipboardList,
  ClipboardPlus,
  HeartHandshake,
  LogIn,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { label: 'Inicio', value: 'home', icon: Home },
  { label: 'Donantes', value: 'donors', icon: Users },
  { label: 'Registro', value: 'appointments', icon: ClipboardList },
  { label: 'Inventario', value: 'inventory', icon: ClipboardPlus },
  { label: 'Registrar Donación', value: 'registerDonation', icon: HeartHandshake }
];

const BloodHeader = ({ onNavigate, isLoggedIn = false, onLogin, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigate = (value) => {
    onNavigate(value);
    setMenuOpen(false);
  };

  return (
    <header className="w-full bg-red-700 text-white px-6 py-4 shadow-lg border-b-4 border-red-900">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Droplet className="w-7 h-7 animate-drip" />
          <h1 className="text-2xl font-bold">RedDrop</h1>
        </div>

        <nav className="hidden md:flex gap-4 items-center">
          {navItems.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => handleNavigate(value)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-600 transition text-sm"
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}

          <button
            onClick={isLoggedIn ? onLogout : onLogin}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-red-700 hover:bg-red-100 font-semibold transition"
          >
            {isLoggedIn ? <LogOut className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            {isLoggedIn ? 'Cerrar Sesión' : 'Login'}
          </button>
        </nav>

        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          {navItems.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => handleNavigate(value)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-600 transition text-sm"
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}

          <button
            onClick={isLoggedIn ? onLogout : onLogin}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-red-700 hover:bg-red-100 font-semibold transition"
          >
            {isLoggedIn ? <LogOut className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            {isLoggedIn ? 'Cerrar Sesión' : 'Login'}
          </button>
        </div>
      )}
    </header>
  );
};

export default BloodHeader;
