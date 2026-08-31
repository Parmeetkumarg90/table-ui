import { Module } from "@nestjs/common";
import { CreateUserController } from "./create-user.controller";
import { CreateUserHandler } from "./create-user.handler";
import { UserRepository } from "src/infrastructure/repository/user.repository";

@Module({
    imports: [],
    controllers: [CreateUserController],
    providers: [CreateUserHandler, UserRepository],
    exports: []
})
export class CreateUserModule { }