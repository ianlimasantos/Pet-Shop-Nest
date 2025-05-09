import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports:[TypeOrmModule.forRootAsync({
        useFactory: async(configService: ConfigService) =>({
            type: "mssql",
            host:configService.get<string>('DATABASE_HOST'),
            port: +configService.get<number>("DATABASE_PORT", 1433),
            username: configService.get<string>("DATABASE_USER"),
            password: configService.get<string>("DATABASE_PASSWORD"),
            database: configService.get<string>("DATABASE_NAME"),
            entities: [__dirname + '/entities/**'],
            migrations: [__dirname + 'migrations/*.ts'],
            synchronize: false,
            options: {
                trustServerCertificate: configService.get<string>('DATABASE_TRUST_SERVER_CERTIFICATE', 'true') === 'true'
            },

        }),
        inject:[ConfigService]
    })]
})
export class DatabaseModule {}

