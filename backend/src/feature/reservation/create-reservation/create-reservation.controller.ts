import { Body, Controller, Post } from "@nestjs/common";
import { CreateReservationHandler } from "./create-reservation.handler";
import { CreateReservationBodyValidator } from "./create-reservation.validator";
import { CreateReservationCommand } from "./create-reservation.command";

@Controller()
export class CreateReservationController {
    constructor(private readonly handler: CreateReservationHandler) { }

    @Post('/reservation')
    async handle(@Body() requestBody: CreateReservationBodyValidator) {
        const command = new CreateReservationCommand(requestBody)
        const response = await this.handler.handle(command)
        return response
    }
}