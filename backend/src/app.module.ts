import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ReservationModule } from './feature/reservation/reservation.module';

@Module({
  imports: [DatabaseModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
