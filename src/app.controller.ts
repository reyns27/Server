import { AppService } from './app.service';
import { Controller, Get, Post, Body, Res} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @ApiTags('auth')
  @Post('api/login')
  async login(@Body() params: AuthDto) {
    return this.authService.loginWithCredentials(params);
  }
}
