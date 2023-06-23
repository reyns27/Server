import { AppService } from './app.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  async login(@Body() params: AuthDto) {
    return this.authService.loginWithCredentials(params);
  }
}
