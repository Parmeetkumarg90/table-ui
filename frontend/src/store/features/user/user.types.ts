import { Order } from "@/components/shared/table/types/table";
import { UserCategory } from "@/features/user/enum/user-category";
import { UserInterface } from "@/features/user/types/user.types";

export interface UserSliceInterface extends ListUserPayloadInterface {
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

export type SortField = 'firstname' | 'lastname' | 'age' | 'category';

export interface ListUserPayloadInterface {
    search?: string;
    page: number;
    limit: number;
    sort?: {
        [key in SortField]: Order
    }
}