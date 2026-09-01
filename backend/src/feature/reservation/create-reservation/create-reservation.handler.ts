import { Injectable } from "@nestjs/common";
import { ReservationRepository } from "src/infrastructure/repository/reservation.repository";
import { CreateReservationCommand } from "./create-reservation.command";
import { Reservation } from "src/domain/reservation/reservation.entity";

@Injectable()
export class CreateReservationHandler {
    constructor(private readonly repository: ReservationRepository) { }

    async handle(command: CreateReservationCommand) {
        const { requestBody } = command

        const newReservation = new Reservation()
        newReservation.firstname = requestBody.firstname
        newReservation.lastname = requestBody.lastname
        newReservation.age = requestBody.age
        newReservation.category = requestBody.category

        const reservation = this.repository.create(newReservation)
        await this.repository.insert(reservation)

        return { message: 'Reservation create successfully', reservation }
    }
}