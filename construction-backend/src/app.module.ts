import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './feature/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
