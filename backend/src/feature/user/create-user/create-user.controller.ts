import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserHandler } from "./create-user.handler";
import { CreateUserBodyValidator } from "./create-user.validator";
import { CreateUserCommand } from "./create-user.command";

@Controller()
export class CreateUserController {
    constructor(private readonly handler: CreateUserHandler) { }

    @Post('/user')
    async handle(@Body() requestBody: CreateUserBodyValidator) {
        const command = new CreateUserCommand(requestBody)
        const response = await this.handler.handle(command)
        return response
    }
}