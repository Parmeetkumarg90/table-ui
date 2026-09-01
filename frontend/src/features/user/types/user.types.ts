import { UserCategory } from "@/features/user/enum/user-category";

export interface UserInterface {
    uuid: string,
    firstname: string,
    lastname: string,
    age: number,
    category: UserCategory,
    created_at: string,
    updated_at: string,
}