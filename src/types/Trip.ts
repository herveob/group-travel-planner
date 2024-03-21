import { Member } from "./Member.types";

export type Trip = {
    id: string;
    startDate: string;
    endDate: string;
    members: Member[];
    ownerId: string;
};