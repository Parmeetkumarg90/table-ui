import { Module } from "@nestjs/common";
import { ListReservationController } from "./list-reservation.controller";
import { ReservationRepository } from "src/infrastructure/repository/reservation.repository";
import { ListReservationHandler } from "./list-reservation.handler";

@Module({
    imports: [],
    controllers: [ListReservationController],
    providers: [ReservationRepository, ListReservationHandler],
    exports: []
})
export class ListReservationModule { }