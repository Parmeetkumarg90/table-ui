import { defineEntity, p } from "@mikro-orm/core";
import { randomUUID } from "crypto";
import { UserCategory } from "./enum/user-category.enum";

export class User {
  id!: bigint;
  uuid: string = randomUUID();
  firstname!: string;
  lastname?: string;
  age!: number;
  category!: UserCategory;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  deleted_at?: Date;
}

const UserEntity = defineEntity<User>({
  name: "user",
  class: User,
  properties: {
    id: p.bigint().autoincrement().primary().hidden(),
    uuid: p.uuid().unique().onCreate(randomUUID),
    firstname: p.string(),
    lastname: p.string().nullable(),
    age: p.integer(),
    category: p.enum(UserCategory).default(UserCategory.ADULT),
    created_at: p.datetime().onCreate(() => new Date()),
    updated_at: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
    deleted_at: p.datetime().nullable(),
  }
});

UserEntity.setClass(User)
