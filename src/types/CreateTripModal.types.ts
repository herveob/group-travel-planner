import { Trip } from "./Trip";

export type CreateTripModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
    trips: Trip[];
};
