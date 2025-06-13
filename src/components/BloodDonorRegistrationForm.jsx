import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BloodDonorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    DNI: '',
    FechaNacimiento: '',
    Sexo: '',
    TipoSangreID: '',
    Telefono: '',
    Email: '',
    Direccion: ''
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showMessage = (msg, isSuccess) => {
    setMessage(msg);
    setSuccess(isSuccess);
    setShowPopup(true);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = ['PrimerNombre', 'PrimerApellido', 'DNI', 'FechaNacimiento', 'Sexo', 'TipoSangreID', 'Direccion'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());

    if (missingFields.length > 0) {
      showMessage('❗ Por favor, completa todos los campos obligatorios marcados con *.', false);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('http://192.168.174.149:3000/api/Donantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showMessage('🎉 ¡Donante registrado con éxito!', true);
        setFormData({
          PrimerNombre: '',
          SegundoNombre: '',
          PrimerApellido: '',
          SegundoApellido: '',
          DNI: '',
          FechaNacimiento: '',
          Sexo: '',
          TipoSangreID: '',
          Telefono: '',
          Email: '',
          Direccion: ''
        });
      } else {
        const errorData = await res.json().catch(() => ({}));
        showMessage(errorData.message || '❌ Error al registrar el donante', false);
      }
    } catch (err) {
      showMessage('❌ Error de conexión con el servidor', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldConfig = [
    { label: 'Primer Nombre *', name: 'PrimerNombre' },
    { label: 'Segundo Nombre', name: 'SegundoNombre' },
    { label: 'Primer Apellido *', name: 'PrimerApellido' },
    { label: 'Segundo Apellido', name: 'SegundoApellido' },
    { label: 'DNI *', name: 'DNI' },
    { label: 'Fecha de Nacimiento *', name: 'FechaNacimiento', type: 'date' },
    {
      label: 'Sexo *',
      name: 'Sexo',
      type: 'select',
      options: [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' }
      ]
    },
    {
      label: 'Tipo de Sangre *',
      name: 'TipoSangreID',
      type: 'select',
      options: [
        { value: '1', label: 'A+' },
        { value: '2', label: 'A-' },
        { value: '3', label: 'B+' },
        { value: '4', label: 'B-' },
        { value: '5', label: 'AB+' },
        { value: '6', label: 'AB-' },
        { value: '7', label: 'O+' },
        { value: '8', label: 'O-' }
      ]
    },
    { label: 'Teléfono', name: 'Telefono', type: 'tel' },
    { label: 'Email', name: 'Email', type: 'email' },
    { label: 'Dirección *', name: 'Direccion' }
  ];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-tr from-red-50 to-white min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-10 border border-red-100">
        <h2 className="text-4xl font-extrabold text-red-700 mb-8 text-center">Registro de Donante</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldConfig.map(({ label, name, type = 'text', options }) => (
            <div key={name} className="space-y-1">
              <label className="block text-sm font-semibold text-gray-600">{label}</label>
              {type === 'select' ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition text-gray-700"
                  required={label.includes('*')}
                >
                  <option value="">Seleccione...</option>
                  {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition text-gray-700"
                  required={label.includes('*')}
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl shadow-lg transition-all text-lg font-semibold ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white'
              }`}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Donante'}
            </button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-xl shadow-lg border z-50 flex items-center ${
              success
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            <div className={`mr-3 text-xl ${success ? 'text-green-500' : 'text-red-500'}`}>
              {success ? '✓' : '✗'}
            </div>
            <div>
              <p className="font-medium">{message}</p>
              <div className={`h-1 mt-2 w-full rounded-full overflow-hidden ${
                success ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 3.5, ease: 'linear' }}
                  className={`h-full ${success ? 'bg-green-400' : 'bg-red-400'}`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BloodDonorRegistrationForm;