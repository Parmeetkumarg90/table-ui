import { CreateUserBodyValidator } from "./create-user.validator";

export class CreateUserCommand {
    constructor(public readonly requestBody: CreateUserBodyValidator) { }
}