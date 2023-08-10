import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { StatudModule } from './statud/statud.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl:true,
      host: 'ep-weathered-tooth-99214722.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'fl0user',
      password: 'RrtZv9Kn4Qqf',
      database: 'DB-ME',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    UserModule,
    RolModule,
    AuthModule,
    StatudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
