import { deleteTripData } from '../../database/trips';
import getTrips from './getTrips';

const deleteTrip = async (id: string) => {
  await deleteTripData(id);
  const trips = await getTrips();
  return trips.filter((trip) => trip.id !== id);
};

export default deleteTrip;