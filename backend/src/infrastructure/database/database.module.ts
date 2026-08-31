import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import mikroormConfig from "./config/mikro-orm.config";

@Module({
    imports: [MikroOrmModule.forRoot(mikroormConfig)],
    controllers: [],
    providers: [],
    exports: []
})
export class DatabaseModule { }