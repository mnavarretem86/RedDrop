import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const BloodInventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Obtener datos del inventario
  useEffect(() => {
    fetch('http://192.168.174.149:3000/api/inventario')
      .then(res => res.json())
      .then(data => {
        setInventory(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtrar resultados
  useEffect(() => {
    const q = search.toLowerCase();
    const results = inventory.filter(item =>
      item.TipoSangre.toLowerCase().includes(q) ||
      item.CentroRecoleccion.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [search, inventory]);

  // Colores para cada tipo de sangre
  const colorsByType = {
    'A+': '#bb8fce',    // morado
    'A-': '#dc2626',    // rojo oscuro
    'B+': '#f97316',    // naranja
    'B-': '#ea580c',    // naranja oscuro
    'AB+': '#6366f1',   // azul
    'AB-': '#4f46e5',   // azul oscuro
    'O+': '#22c55e',    // verde
    'O-': '#16a34a',    // verde oscuro
  };

  // Agrupar y sumar cantidades por TipoSangre
  const totalsByType = filtered.reduce((acc, item) => {
    const cantidadNum = parseInt(item.Cantidad.replace(/\D/g, ''), 10) || 0;
    acc[item.TipoSangre] = (acc[item.TipoSangre] || 0) + cantidadNum;
    return acc;
  }, {});

  const maxCantidad = Math.max(...Object.values(totalsByType), 0);

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <p className="text-gray-700 animate-pulse">Cargando inventario...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-red-50 to-white min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold text-red-800 mb-6 md:mb-8 text-center">
        Inventario de Sangre
      </h2>

      {/* Barra de búsqueda */}
      <div className="max-w-xl mx-auto mb-6 md:mb-8">
        <div className="flex items-center bg-white border border-red-300 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-2 shadow-md">
          <Search className="text-red-500 h-4 w-4 md:h-5 md:w-5 mr-2" />
          <input
            type="text"
            placeholder="Buscar por tipo o centro..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full focus:outline-none text-sm md:text-base text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No se encontraron resultados</p>
      ) : (
        <>
          {/* Tabla responsiva */}
          <div className="mb-8 md:mb-12 overflow-hidden">
            {isMobile ? (
              // Vista móvil - Tarjetas
              <div className="space-y-3">
                {filtered.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow border border-red-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold text-red-700">{item.TipoSangre}</span>
                        <span className="ml-2 text-sm text-gray-500">#{index + 1}</span>
                      </div>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        {item.Cantidad}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Centro:</span> {item.CentroRecoleccion}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Ingreso:</span> {item.FechaIngreso}
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      <span className="font-medium">Días restantes:</span> {item.DiasRestantes}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Vista desktop - Tabla
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg md:rounded-xl overflow-hidden border border-red-200">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="py-3 px-4 md:px-6 text-left text-sm md:text-base">#</th>
                      <th className="py-3 px-4 md:px-6 text-left text-sm md:text-base">Tipo</th>
                      <th className="py-3 px-4 md:px-6 text-left text-sm md:text-base">Cantidad</th>
                      <th className="py-3 px-4 md:px-6 text-left text-sm md:text-base">Centro</th>
                      <th className="py-3 px-4 md:px-6 text-left text-sm md:text-base">Ingreso</th>
                      <th className="py-3 px-4 md:px-6 text-left text-sm md:text-base">Días Rest.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-red-50' : 'bg-white'}
                      >
                        <td className="py-3 px-4 md:px-6 font-semibold text-gray-700 text-sm md:text-base">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 md:px-6 text-red-700 font-bold text-sm md:text-base">
                          {item.TipoSangre}
                        </td>
                        <td className="py-3 px-4 md:px-6 text-sm md:text-base">{item.Cantidad}</td>
                        <td className="py-3 px-4 md:px-6 text-sm md:text-base">{item.CentroRecoleccion}</td>
                        <td className="py-3 px-4 md:px-6 text-sm md:text-base">{item.FechaIngreso}</td>
                        <td className="py-3 px-4 md:px-6 text-red-600 font-semibold text-sm md:text-base">
                          {item.DiasRestantes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Gráfico de barras */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-red-700">
              Total por Tipo de Sangre
            </h3>
            <div className="space-y-3 md:space-y-4">
              {Object.entries(totalsByType).map(([tipo, cantidad]) => {
                const widthPercent = (cantidad / maxCantidad) * 100;
                const color = colorsByType[tipo] || '#9ca3af';

                return (
                  <div key={tipo} className="flex items-center gap-2 md:gap-4">
                    <span className="w-12 md:w-20 font-semibold text-red-700 text-sm md:text-base">
                      {tipo}
                    </span>
                    <div className="flex-1 bg-red-100 rounded-full h-4 md:h-6 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${widthPercent}%`, backgroundColor: color }}
                      />
                    </div>
                    <span className="w-12 md:w-16 text-right font-semibold text-red-700 text-sm md:text-base">
                      {cantidad} ml
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BloodInventoryList;