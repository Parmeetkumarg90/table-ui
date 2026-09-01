import { UserCategory } from "@/features/user/enum/user-category";
import { UserInterface } from "@/features/user/types/user.types";

export interface UserSliceInterface {
    page: number;
    limit: number;
    total: number;
    loading: boolean;
    users: UserInterface[];
}

export interface CreateUserPayloadInterface {
    firstname: string,
    lastname: string,
    age: number,
    category: UserCategory
}

export interface ListUserPayloadInterface {
    search?: string;
    page: number;
    limit: number;
    sort: {
        fieldname: 'firstname' | 'lastname' | 'age' | 'category';
        order: 'asc' | 'desc'
    }
}