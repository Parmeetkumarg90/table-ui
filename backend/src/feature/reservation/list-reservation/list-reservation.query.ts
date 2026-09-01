import { ListReservationParamsValidator } from "./list-reservation.validator";

export class ListReservationParamQuery {
    constructor(public readonly queryParams: ListReservationParamsValidator) { }
}