import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repository";
import { ListUserParamQuery } from "./list-user.query";
import { User } from "src/domain/user/user.entity";
import { FilterQuery, FindOptions } from "@mikro-orm/core";

@Injectable()
export class ListUserHandler {
    constructor(private readonly repository: UserRepository) { }

    async handle(command: ListUserParamQuery) {
        const { queryParams: { limit, page, search, categories, sort } } = command;

        const condition: FilterQuery<User> = {}
        const options: FindOptions<User> = {
            limit: limit,
            offset: (page - 1) * limit
        }

        if (search) {
            condition.$or = [
                { firstname: { $ilike: `%${search}%` } },
                { lastname: { $ilike: `%${search}%` } }
            ]
        }

        if (categories && categories.length > 0) {
            condition.category = { $in: categories }
        }

        if (sort && sort.length > 0) {
            const orderBy: Record<string, 'ASC' | 'DESC'> = {}
            sort.forEach((sortField) => {
                orderBy[sortField.fieldname] = (sortField.order?.toUpperCase() as 'ASC' | 'DESC') || 'ASC'
            })
            options.orderBy = orderBy
        }

        const [users, total] = await this.repository.findAndCount(condition, options)

        return { total, limit, page, users }
    }
}