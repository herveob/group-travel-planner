import { Trip } from '../../types/Trip';
import { writeTripData } from '../../database/trips';
export const createTrip = async (trip: Trip): Promise<Trip> => {
    return await writeTripData(trip);
};
