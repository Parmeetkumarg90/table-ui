import { UserCategory } from "@/features/reservation/enum/user-category";

export interface ReservationInterface {
    uuid: string,
    firstname: string,
    lastname: string,
    age: number,
    category: UserCategory,
    created_at: string,
    updated_at: string,
}