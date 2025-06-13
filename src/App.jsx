import React, { useState } from 'react';
import BloodHeader from './components/BloodHeader';
import BloodDonorList from './components/BloodDonorList';
import BloodDonorRegistrationForm from './components/BloodDonorRegistrationForm';
import BloodAbout from './components/BloodAbout';
import BloodInventoryList from './components/BloodInventoryList';
import RegisterDonation from './components/registerDonation'; // <-- Importa tu componente de donaciones

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDonorId, setSelectedDonorId] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedDonorId(null);
  };

  const handleSelectDonor = (donorId) => {
    setSelectedDonorId(donorId);
    setCurrentPage('donorDetail');
  };

  const handleBackToList = () => {
    setCurrentPage('donors');
    setSelectedDonorId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BloodHeader onNavigate={handleNavigate} />

      <main>
        {currentPage === 'home' && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gradient-to-br from-red-500 to-red-800 text-white p-8 text-center">
            <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">¡Salva Vidas, Dona Sangre!</h2>
            <p className="text-xl mb-8 max-w-2xl">
              Tu donación es un acto de amor que puede cambiar el destino de muchas personas. Únete a nuestra comunidad de héroes.
            </p>
            <button
              onClick={() => handleNavigate('appointments')}
              className="bg-white text-red-700 py-3 px-8 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Registrar Donante
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="mt-4 bg-transparent border border-white text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-white hover:text-red-700 transition-all duration-300"
            >
              Acerca de RedDrop
            </button>
          </div>
        )}

        {currentPage === 'donors' && <BloodDonorList onSelectDonor={handleSelectDonor} />}

        {currentPage === 'appointments' && <BloodDonorRegistrationForm />}

        {currentPage === 'inventory' && <BloodInventoryList />}

        {currentPage === 'registerDonation' && <RegisterDonation />}

        {currentPage === 'about' && <BloodAbout onNavigate={handleNavigate} />}
      </main>
    </div>
  );
};

export default App;
