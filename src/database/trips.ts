import { collection, setDoc, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { Trip } from "../types/Trip";
import { db } from "./db";

export const writeTripData = async (trip: Trip): Promise<Trip> => {
  try {

    const tripRef = doc(db, 'trips', trip.id);
    await setDoc(tripRef, trip);
    const snapshot = await getDoc(tripRef);
    if (snapshot.exists()) {
      return snapshot.data() as Trip;
    } else {
      throw new Error("New trip data not found");
    }
  } catch (error) {
    throw error;
  }
};

export const getTripsData = async () => {
  try {
    const tripsCollection = collection(db, 'trips');
    const tripsSnapshot = await getDocs(tripsCollection);
    const trips: Trip[] = [];
    tripsSnapshot.forEach(doc => {
      trips.push(doc.data() as Trip);
    });
    return trips;
  } catch (error) {
    throw error;
  }
};

export const deleteTripData = async (id: string): Promise<void> => {
  try {
    const tripRef = doc(db, 'trips', id);
    await deleteDoc(tripRef);
  } catch (error) {
    throw error;
  }
};