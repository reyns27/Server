import { Module } from '@nestjs/common';
import { StatudService } from './statud.service';
import { StatudController } from './statud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { details } from './entities/details.entity';
import { Statud } from './entities/statud.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([details, Statud]),UserModule],
  controllers: [StatudController],
  providers: [StatudService],
  exports: [StatudService]
})
export class StatudModule { }
