import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [UserModule, DatabaseModule, ConfigModule.forRoot({isGlobal: true}), FirestoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
