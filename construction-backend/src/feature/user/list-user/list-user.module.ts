import { Module } from "@nestjs/common";
import { ListUserController } from "./list-user.controller";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { ListUserHandler } from "./list-user.handler";

@Module({
    imports: [],
    controllers: [ListUserController],
    providers: [UserRepository, ListUserHandler],
    exports: []
})
export class ListUserModule { }