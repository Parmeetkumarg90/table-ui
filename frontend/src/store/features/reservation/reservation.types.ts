import { Order } from "@/components/shared/table/types/table";
import { UserCategory } from "@/features/reservation/enum/user-category";
import { ReservationInterface } from "@/features/reservation/types/reservation.types";

export interface ReservationSliceInterface extends ListReservationPayloadInterface {
  total: number;
  loading: boolean;
  reservations: ReservationInterface[];
}

export interface CreateReservationPayloadInterface {
  firstname: string;
  lastname: string;
  age: number;
  category: UserCategory;
}

export type SortField = "firstname" | "lastname" | "age" | "category";

export interface ListReservationPayloadInterface {
  search?: string;
  page: number;
  limit: number;
  categories?: UserCategory[];
  sort?: {
    [key in SortField]?: Order;
  };
}
