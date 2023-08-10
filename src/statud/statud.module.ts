import { Module } from '@nestjs/common';
import { StatudService } from './statud.service';
import { StatudController } from './statud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { details } from './details/entities/details.entity';
import { Statud } from './entities/statud.entity';
import { UserModule } from 'src/user/user.module';
import { DetailsService } from './details/details.service';

@Module({
  imports: [TypeOrmModule.forFeature([details, Statud]),UserModule],
  controllers: [StatudController],
  providers: [StatudService, DetailsService],
  exports: [StatudService, DetailsService]
})
export class StatudModule { }
