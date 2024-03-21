import { Trip } from '../../types/Trip';
import { getTripsData } from '../../database/trips';

const getTrips = async (): Promise<Trip[]> => {
  return await getTripsData();
};

export default getTrips;