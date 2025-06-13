import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { fetchDonors } from '../mock/donors';

const BloodDonorList = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDonors()
      .then(data => {
        setDonors(data);
        setFilteredDonors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    const results = donors.filter(d =>
      d.Donate.toLowerCase().includes(query) ||
      d.TipoDeSangre.toLowerCase().includes(query)
    );
    setFilteredDonors(results);
  }, [search, donors]);

  if (loading) return <p className="p-6 text-gray-700">Cargando donantes...</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-red-50 to-white min-h-screen">
      <h2 className="text-4xl font-bold text-red-800 mb-8 text-center">Nuestros Donantes</h2>

      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-center bg-white border border-red-300 rounded-xl px-4 py-2 shadow-md">
          <Search className="text-red-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar por nombre o tipo de sangre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full focus:outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      {filteredDonors.length === 0 ? (
        <p className="text-center text-gray-600">No se encontraron donantes.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map(donor => (
            <div
              key={donor.id}
              className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transition-transform hover:scale-[1.02]"
            >
              <h3 className="text-2xl font-bold text-red-700 mb-2">{donor.Donate}</h3>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">Tipo de Sangre:</span>{' '}
                <span className="text-red-600 font-bold">{donor.TipoDeSangre}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">Cantidad:</span>{' '}
                {donor.CantidadML} ml
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">Centro:</span>{' '}
                {donor.CentroRecoleccion}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Fecha: {donor.FechaDonacion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodDonorList;
