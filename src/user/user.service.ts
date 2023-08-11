import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolService } from 'src/rol/rol.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    private rolServices: RolService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  //Create
  async create(createUserDto: CreateUserDto) {
    const rolFound = await this.rolServices.findOne(createUserDto.rolId);

    if (!rolFound) return new HttpException('error', HttpStatus.NOT_FOUND);

    const newUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (newUser) return new HttpException('ERROR_EMAIL_CONFLICT', HttpStatus.CONFLICT);
    const Hash = bcrypt.hashSync(createUserDto.password, 10);
    const result = this.usersRepository.create({
      ...createUserDto,
      password: Hash,
      status: 1,
    });

    return this.usersRepository.save(result);
  }

  //*-----------//GetAll------------------*/
  findAll() {
    return this.usersRepository.find({ select: { password: false }, relations: ['rol'] });
  }

  //*-----------//Get Id------------------*/
  findOne(id: number) {
    return this.usersRepository.findOne({
      select: {
        password: false
      },
      where: {
        Id: id,
      },
      relations: ['rol'],
    });
  }

  //*-----------//Get Id------------------*/
  getUser(email: string) {
    return this.usersRepository.findOne({
      select: {
        password: false
      },
      where: {
        email: email,
      },
    });
  }

  //*-----------Update------------------*/
  async update(Id: number, updateUserDto: UpdateUserDto) {
    const validUser = await this.usersRepository.findOne({
      where: {
        Id,
      },
    });

    if (!validUser) return new HttpException('USER_FOUND', HttpStatus.FOUND);

    const Hash =
      updateUserDto.password != undefined
        ? bcrypt.hashSync(updateUserDto.password, 10)
        : validUser.password;
    const result = await this.usersRepository.update(Id, {
      ...updateUserDto,
      password: Hash,
    });

    if (result.affected == 1)
      return this.usersRepository.findOne({ where: { Id } });
    new HttpException('USER_NOT_UPDATE', HttpStatus.EXPECTATION_FAILED);
  }

  //*-----------/Delete------------------*/
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
