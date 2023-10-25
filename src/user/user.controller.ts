import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDto } from './dto/req-email.dto';
import { resetPasswordDto } from './dto/req-password.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private mailService:MailerService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('reset/password')
   async SendMail(@Body() emailDto:EmailDto){
    const Token = await this.userService.resetPassword(emailDto.Email);
    var response = await this.mailService.sendMail(
      {
        to:emailDto.Email,
        from:"joelreynoso51@gmail.com",
        subject:'Restablecer contraseña',
        text:`Utilice el siguiente token para restablecer la contraseña: ${Token}`
      }
    );
    return response;
   };

   @Post('change/password')
   async changePassword(@Body() params:resetPasswordDto){
    const result = await this.userService.validToken(params);
    return result;
   }
}
