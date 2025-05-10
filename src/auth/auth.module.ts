import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'process';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule, JwtModule.registerAsync({
        global: true,
        useFactory: async(configService: ConfigService) => ({
            secret: configService.get<string>("JWT_SECRET"),
            signOptions:{expiresIn: +configService.get<number>("JWT_EXPIRATION_TIME")!}
        }),
        inject: [ConfigService]
    })],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {

}
