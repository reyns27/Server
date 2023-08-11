import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStatudDto } from './dto/create-statud.dto';
import { UpdateStatudDto } from './dto/update-statud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Statud } from './entities/statud.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';


@Injectable()
export class StatudService {
  constructor(
    @InjectRepository(Statud) private statudServices: Repository<Statud>,
    private userServices: UserService,
  ) { }

  async create(createStatudDto: CreateStatudDto) {
    const userFound = await this.userServices.findOne(createStatudDto.userId);

    if (!userFound)
      return new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const newStatud = this.statudServices.create({
      ...createStatudDto,
      status: 1,
    });

    if (!newStatud)
      return new HttpException('ERROR_NEW-STATUD_FOUND', HttpStatus.FOUND);

    return this.statudServices.save(newStatud);
  }

  async findAll() {
    return this.statudServices.find({ relations: ['details'] });
  }

  async findOne(id: number) {
    const result = await this.statudServices.findOne({
      where: { id },
      relations: ['details'],
    });

    if (!result)
      return new HttpException('ERROR_STATUD_NOT_FOUND', HttpStatus.NOT_FOUND);

    return result;
  }

  async getStatudForUser(userId: number) {
    const result = await this.statudServices.find({
      where: { userId },
      relations: ['details'],
    });
    if (!result)
      return new HttpException('ERROR_STATUD_NOT_FOUND', HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, updateStatudDto: UpdateStatudDto) {
    const statudFound = await this.findOne(id);
    if (statudFound) {
      const updateStatud = await this.statudServices.update(
        id,
        updateStatudDto,
      );
      if (updateStatud.affected == 1) return this.findOne(id);
    }
    return new HttpException('ERROR_STATUD_UPDATED_FOUND', HttpStatus.FOUND);
  };

  remove(id: number) {
    return `This action removes a #${id} statud`;
  };
}
