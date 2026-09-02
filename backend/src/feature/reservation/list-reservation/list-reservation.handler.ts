import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/infrastructure/repository/reservation.repository';
import { ListReservationParamQuery } from './list-reservation.query';
import { Reservation } from 'src/domain/reservation/reservation.entity';
import { FilterQuery, FindOptions } from '@mikro-orm/core';

@Injectable()
export class ListReservationHandler {
  constructor(private readonly repository: ReservationRepository) {}

  async handle(command: ListReservationParamQuery) {
    const {
      queryParams: { limit, page, search, categories, sort },
    } = command;

    const condition: FilterQuery<Reservation> = {};
    const options: FindOptions<Reservation> = {
      limit: limit,
      offset: (page - 1) * limit,
    };

    if (search) {
      const searchParts = search.trim().split(/\s+/);

      if (searchParts.length >= 2) {
        const [first, last] = searchParts;

        condition.$or = [
          {
            firstname: { $ilike: `%${first}%` },
            lastname: { $ilike: `%${last}%` },
          },
          {
            firstname: { $ilike: `%${last}%` },
            lastname: { $ilike: `%${first}%` },
          },
        ];
      } else {
        condition.$or = [
          { firstname: { $ilike: `%${search}%` } },
          { lastname: { $ilike: `%${search}%` } },
        ];
      }
    }

    if (categories && categories.length > 0) {
      condition.category = { $in: categories };
    }

    if (sort && sort.length > 0) {
      const orderBy: Record<string, 'ASC' | 'DESC'> = {};
      sort.forEach((sortField) => {
        orderBy[sortField.fieldname] =
          (sortField.order?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';
      });
      options.orderBy = orderBy;
    }

    const [reservations, total] = await this.repository.findAndCount(
      condition,
      options,
    );

    return { total, limit, page, reservations };
  }
}
