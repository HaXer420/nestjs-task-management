import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    await this.userRepository.signUp(authCredentialDTO);
  }

  async signin(
    authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateLogin(authCredentialDTO);
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: jwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
