import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, AlertCircle, Loader2, UserCheck, MapPin, Droplet } from 'lucide-react';

const BloodDonationForm = () => {
  const [donantes, setDonantes] = useState([]);
  const [centros, setCentros] = useState([]);
  const [formData, setFormData] = useState({
    DonanteID: '',
    CentroID: '',
    CantidadML: '',
    BusquedaDonante: ''
  });

  const [donantesFiltrados, setDonantesFiltrados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Obtener donantes
    fetch('http://192.168.174.149:3000/api/Donantes/nombres')
      .then(res => res.json())
      .then(data => {
        setDonantes(data);
        setDonantesFiltrados(data);
      })
      .catch(() => setMensaje('❌ Error al cargar los donantes'));

    // Obtener centros
    fetch('http://192.168.174.149:3000/api/centros')
      .then(res => res.json())
      .then(data => setCentros(data))
      .catch(() => setMensaje('❌ Error al cargar los centros de recolección'));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBuscarDonante = (e) => {
    const busqueda = e.target.value.toLowerCase();
    setFormData(prev => ({ ...prev, BusquedaDonante: e.target.value }));
    
    if (busqueda.length > 0) {
      const resultados = donantes.filter(d => 
        d.Donante.toLowerCase().includes(busqueda)
      );
      setDonantesFiltrados(resultados);
      setMostrarResultados(true);
    } else {
      setDonantesFiltrados(donantes);
      setMostrarResultados(false);
    }
  };

  const seleccionarDonante = (donante) => {
    setFormData(prev => ({
      ...prev,
      DonanteID: donante.DonanteID,
      BusquedaDonante: donante.Donante.trim()
    }));
    setMostrarResultados(false);
    setMensaje('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMensaje('');
    const { DonanteID, CentroID, CantidadML } = formData;

    if (!DonanteID || !CentroID || !CantidadML) {
      setMensaje('❗ Todos los campos son obligatorios');
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('http://192.168.174.149:3000/api/donaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ DonanteID, CentroID, CantidadML })
      });

      if (res.ok) {
        setMensaje('✅ Donación registrada con éxito');
        setSuccess(true);
        setFormData({
          DonanteID: '',
          CentroID: '',
          CantidadML: '',
          BusquedaDonante: ''
        });
      } else {
        const errorData = await res.json().catch(() => ({}));
        setMensaje(errorData.message || '❌ Error al registrar la donación');
        setSuccess(false);
      }
    } catch {
      setMensaje('❌ No se pudo conectar al servidor');
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-10 shadow-2xl rounded-3xl border border-red-200">
        <h2 className="text-4xl font-extrabold text-red-700 mb-8 text-center tracking-tight">
          Registrar Donación <Droplet className="inline-block ml-2 text-red-500" />
        </h2>
        
        {mensaje && (
          <div
            className={`flex items-center gap-3 p-4 rounded-xl mb-8 text-center font-semibold
              ${
                success === true
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : success === false
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
              }
              animate-fade-in
            `}
            role="alert"
          >
            {success === true && <CheckCircle2 className="w-6 h-6" />}
            {success === false && <AlertCircle className="w-6 h-6" />}
            <span>{mensaje}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Campo Buscar Donante */}
          <div className="space-y-2 relative">
            <label htmlFor="BusquedaDonante" className="block text-lg font-semibold text-gray-800">
              Buscar Donante <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-2xl px-5 py-3 focus-within:ring-2 focus-within:ring-red-400 transition">
              <Search size={20} className="text-gray-400 mr-3" />
              <input
                id="BusquedaDonante"
                type="text"
                name="BusquedaDonante"
                value={formData.BusquedaDonante}
                onChange={handleBuscarDonante}
                placeholder="Buscar por nombre..."
                className="flex-grow bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
                disabled={isSubmitting}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            {mostrarResultados && (
              <ul className="absolute z-20 top-full left-0 right-0 max-h-52 overflow-y-auto bg-white border border-gray-300 rounded-xl shadow-lg mt-2 scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-gray-100">
                {donantesFiltrados.length > 0 ? (
                  donantesFiltrados.map(d => (
                    <li
                      key={d.DonanteID}
                      onClick={() => seleccionarDonante(d)}
                      className="cursor-pointer px-5 py-3 hover:bg-red-50 transition select-none"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && seleccionarDonante(d)}
                    >
                      <UserCheck className="inline-block mr-2 text-red-500" />
                      {d.Donante.trim()}
                    </li>
                  ))
                ) : (
                  <li className="px-5 py-3 text-gray-500 select-none">No se encontraron donantes</li>
                )}
              </ul>
            )}
            {formData.DonanteID && (
              <p className="mt-2 text-green-700 font-semibold select-none">
                Donante seleccionado: <span className="underline">{formData.BusquedaDonante}</span>
              </p>
            )}
          </div>

          {/* Selección de Centro */}
          <div className="space-y-2">
            <label htmlFor="CentroID" className="block text-lg font-semibold text-gray-800">
              Centro de Recolección <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <select
                id="CentroID"
                name="CentroID"
                value={formData.CentroID}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="appearance-none w-full border border-gray-300 rounded-2xl py-3 px-5 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-400 transition cursor-pointer"
              >
                <option value="" disabled>Seleccione un centro</option>
                {centros.map(c => (
                  <option key={c.CentroID} value={c.CentroID}>{c.Nombre}</option>
                ))}
              </select>
              <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Cantidad ML */}
          <div className="space-y-2">
            <label htmlFor="CantidadML" className="block text-lg font-semibold text-gray-800">
              Cantidad (ml) <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                id="CantidadML"
                type="number"
                name="CantidadML"
                min="100"
                max="1000"
                step="50"
                value={formData.CantidadML}
                onChange={handleChange}
                placeholder="Ej: 450"
                required
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-2xl py-3 px-5 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <Droplet className="absolute right-5 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" size={20} />
            </div>
            <p className="text-sm text-gray-500">Cantidad entre 100-500 ml</p>
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-3xl shadow-lg text-lg font-extrabold transition
              ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-gray-100'
                  : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white'
              }
            `}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <Loader2 className="animate-spin" size={24} />
                Procesando...
              </span>
            ) : (
              'Registrar Donación'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BloodDonationForm;
