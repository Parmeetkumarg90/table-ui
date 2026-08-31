import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { User } from "src/domain/user/user.entity";

@Injectable()
export class UserRepository extends EntityRepository<User> {
    constructor(em: EntityManager) {
        super(em, User)
    }
}