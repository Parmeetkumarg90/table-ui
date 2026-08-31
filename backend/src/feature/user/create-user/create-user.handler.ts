import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { CreateUserCommand } from "./create-user.command";
import { User } from "src/domain/user/user.entity";

@Injectable()
export class CreateUserHandler {
    constructor(private readonly repository: UserRepository) { }

    async handle(command: CreateUserCommand) {
        const { requestBody } = command

        const newUser = new User()
        newUser.firstname = requestBody.firstname
        newUser.lastname = requestBody.lastname
        newUser.age = requestBody.age
        newUser.category = requestBody.category

        const user = this.repository.create(newUser)
        await this.repository.insert(user)

        return { message: 'User create successfully', user }
    }
}