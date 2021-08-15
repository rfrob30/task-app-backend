import { Controller, Post, Body, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
const AllowAny = () => SetMetadata('allow-any', true);

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @AllowAny()
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUserByPassword(loginUserDto);
  }
}
