import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport:{
        host:'smtp.gmail.com',
        port: 465,
        secure:true,
        auth:{
          user:'joelreynoso51@gmail.com',
          pass:'qkws pmfr pvck dvlk'
        }
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl:true,
      host: 'ep-jolly-union-85828486.us-east-2.aws.neon.fl0.io',
      port: 5432,
      username: 'fl0user',
      password: '9gjJs0DYluNy',
      database: 'DB-API',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    UserModule,
    RolModule,
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
