import { Module } from "@nestjs/common";
import { CreateReservationHandler } from "./create-reservation.handler";
import { ReservationRepository } from "src/infrastructure/repository/reservation.repository";
import { CreateReservationController } from "./create-reservation.controller";

@Module({
    imports: [],
    controllers: [CreateReservationController],
    providers: [CreateReservationHandler, ReservationRepository],
    exports: []
})
export class CreateReservationModule { }