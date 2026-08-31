import { Controller, Get, Query } from "@nestjs/common";
import { ListUserHandler } from "./list-user.handler";
import { ListUserParamQuery } from "./list-user.query";
import { ListUserParamsValidator } from "./list-user.validator";

@Controller()
export class ListUserController {
    constructor(private readonly handler: ListUserHandler) { }

    @Get('/user')
    async handle(@Query() queryParams: ListUserParamsValidator) {
        const query = new ListUserParamQuery(queryParams)
        const response = await this.handler.handle(query)
        return response;
    }
}