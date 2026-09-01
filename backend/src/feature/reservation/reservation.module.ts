import { Module } from "@nestjs/common";
import { CreateReservationModule, } from "./create-reservation/create-reservation.module";
import { ListReservationModule, } from "./list-reservation/list-reservation.module";

@Module({
    imports: [CreateReservationModule, ListReservationModule],
    controllers: [],
    providers: [],
    exports: []
})
export class ReservationModule { }