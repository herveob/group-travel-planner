import { Member } from "./Member.types";

export type Trip = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    members: Member[];
    ownerId: string;
};