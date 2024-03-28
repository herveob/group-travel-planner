import { Trip } from '../types/Trip';
import { writeTripData, deleteTripData, getTripsData } from '../database/trips';

export const createTrip = async (trip: Trip): Promise<Trip> => {
    return await writeTripData(trip);
};

export const deleteTrip = async (id: string) => {
    await deleteTripData(id);
    const trips = await getTrips();
    return trips.filter((trip) => trip.id !== id);
};

export const getTrips = async (): Promise<Trip[]> => {
    return await getTripsData();
};