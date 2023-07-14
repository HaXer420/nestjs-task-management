import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private authEntity: Repository<User>,
  ) {}

  async signUp(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const { username, password } = authCredentialDTO;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        // Postgres duplication error code
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async validateLogin(authCredentialDTO: AuthCredentialDTO): Promise<string> {
    const { username, password } = authCredentialDTO;

    const user = await this.authEntity.findOne({ where: { username } });

    if (user && (await user.validatePassword(password))) {
      return username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
