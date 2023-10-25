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
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:join(__dirname,'../','client/dist')}),
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
      host: 'dpg-cknbi1iv7m0s73cbup7g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'admin',
      password: 'CYTe6xI3oP5MbqRGHEvJuqRWxSu41cMm',
      database: 'db_kzck',
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
