import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Initial login
   * @param loginData
   * @returns
   */
  async validateUserByPassword(loginData: LoginUserDto) {
    let userToAttempt = await this.usersService.findOneByEmail(loginData.email);

    console.log(userToAttempt, 'deez nuts');

    return new Promise((resolve) => {
      userToAttempt.checkPassword(loginData.password, (err, isMatch) => {
        if (err) throw new UnauthorizedException();
        if (isMatch) {
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          throw new UnauthorizedException();
        }
      });
    });
  }

  /**
   * revalidate user after they have logged in and already have a token
   * @param payload
   * @returns
   */
  async validateUserByJwt(payload: JwtPayload) {
    let user = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * creates jwt token based on user
   * @param user
   * @returns
   */
  createJwtPayload(user) {
    let data: JwtPayload = {
      email: user.email,
    };

    let jwt = this.jwtService.sign(data);

    return {
      token: jwt,
    };
  }
}
