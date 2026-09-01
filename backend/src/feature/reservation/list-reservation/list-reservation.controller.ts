import { Controller, Get, Query } from "@nestjs/common";
import { ListReservationHandler } from "./list-reservation.handler";
import { ListReservationParamsValidator } from "./list-reservation.validator";
import { ListReservationParamQuery } from "./list-reservation.query";

@Controller()
export class ListReservationController {
    constructor(private readonly handler: ListReservationHandler) { }

    @Get('/reservation')
    async handle(@Query() queryParams: ListReservationParamsValidator) {
        const query = new ListReservationParamQuery(queryParams)
        const response = await this.handler.handle(query)
        return response;
    }
}