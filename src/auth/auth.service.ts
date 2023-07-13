import { Injectable } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    await this.userRepository.signUp(authCredentialDTO);
  }
}
