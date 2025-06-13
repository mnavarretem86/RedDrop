export async function fetchDonors() {
  try {
    const response = await fetch('http://192.168.174.149:3000/api/Donantes');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.map((donor, index) => ({
      id: `${Date.now()}-${index}`,
      Donate: donor.Donate,
      TipoDeSangre: donor.TipoDeSangre,
      CantidadML: donor.CantidadML,
      CentroRecoleccion: donor.CentroRecoleccion,
      FechaDonacion: donor.FechaDonacion,
    }));
  } catch (error) {
    console.error('Error fetching donors:', error);
    return [];
  }
}
