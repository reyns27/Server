import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolService } from 'src/rol/rol.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { resetPasswordDto } from './dto/req-password.dto';


@Injectable()
export class UserService {
  constructor(
    private rolServices: RolService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  //Create
  async create(createUserDto: CreateUserDto) {
    const rolFound = await this.rolServices.findOne(createUserDto.rolId);

    if (!rolFound) return new HttpException('ID_ROL_NOT_EXISTS', HttpStatus.NOT_FOUND);

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
    return this.usersRepository.find({ select: { password: false }, relations: ['rol'],});
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
  async getUser(email: string):Promise<User> {
    const result:User = await this.usersRepository.findOne({
      select: {
        password: false
      },
      where: {
        email: email,
      },
    });

    if(!result) new HttpException('EMAIL_FOUND', HttpStatus.FOUND);
    return result;
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

  async resetPassword(email: string){
    const userValid = await this.getUser(email);
    if (!userValid) return new HttpException('ACCOUNT_FOUND',HttpStatus.FOUND);

    const Token = uuidv4();
    const result = await this.usersRepository.update(userValid.Id, {
      token_Password: Token
    });

    if(result.affected == 1)
      return Token;

    return new HttpException('TOKEN_NOT_UPDATE', HttpStatus.EXPECTATION_FAILED);

  } 

  async validToken(params:resetPasswordDto){
    const {Password, Token} = params;
    const Hash = bcrypt.hashSync(Password, 10);
    const validtoken = await this.usersRepository.findOne({where:{token_Password:Token}})
    if(!validtoken) return new HttpException('TOKEN_NOT_FOUND', HttpStatus.EXPECTATION_FAILED);
    const result = await this.usersRepository.update(validtoken.Id,{
      token_Password:null,
      password:Hash
    });

    if(result.affected < 1) return new HttpException('PASSWORD_NOT_UPDATE', HttpStatus.EXPECTATION_FAILED);
    return {email:validtoken.email, Password_reset:true}
  }

}
