export const getDonorById = (id, donorList) => {
  return donorList.find(donor => donor.id === id);
};

export const getAppointmentsByDonor = (donorId, appointmentList) => {
  return appointmentList.filter(appointment => appointment.donorId === donorId);
};