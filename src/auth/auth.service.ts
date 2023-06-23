import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  async loginWithCredentials(user: AuthDto) {
    const { email, password } = user;
    const findUser = await this.userService.getUser(email);
    if (!findUser) return new HttpException('USER_NOT_FOUND', HttpStatus.FOUND);

    const CheckPassowrd = await compare(password, findUser.password);
    if (!CheckPassowrd)
      return new HttpException('PASSWORD_INCORRECT', HttpStatus.UNAUTHORIZED);

    const payload = {
      id: findUser.Id,
      name: findUser.userName,
    };

    const Token = this.jwtTokenService.sign(payload);

    const data = {
      user: findUser,
      Token,
    };
    return data;
  }
}
