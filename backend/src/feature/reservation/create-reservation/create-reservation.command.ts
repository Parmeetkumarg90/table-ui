import { CreateReservationBodyValidator } from "./create-reservation.validator";

export class CreateReservationCommand {
    constructor(public readonly requestBody: CreateReservationBodyValidator) { }
}