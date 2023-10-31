import { AppService } from './app.service';
import { Controller, Post, Body} from '@nestjs/common';
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
