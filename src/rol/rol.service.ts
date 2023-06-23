import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private rolRepository: Repository<Rol>) {}

  create(createRolDto: CreateRolDto) {
    const result = this.rolRepository.create(createRolDto);
    return this.rolRepository.save(result);
  }

  findAll() {
    return this.rolRepository.find({ relations: ['users'] });
  }

  findOne(id: number) {
    return this.rolRepository.findOne({
      where: {
        Id: id,
      },
      relations: ['users'],
    });
  }

  validateRol(id: number) {
    const result = this.rolRepository.findOne({
      where: {
        Id: id,
      },
    });

    return result ? true : false;
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return this.rolRepository.update(id, updateRolDto);
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
