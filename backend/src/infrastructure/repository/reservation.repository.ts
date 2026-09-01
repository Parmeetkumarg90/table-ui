import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Reservation } from "src/domain/reservation/reservation.entity";

@Injectable()
export class ReservationRepository extends EntityRepository<Reservation> {
    constructor(em: EntityManager) {
        super(em, Reservation)
    }
}