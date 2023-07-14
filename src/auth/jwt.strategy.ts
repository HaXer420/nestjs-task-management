import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './auth.repository';
import { jwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userEntity: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'HelloToMyNestTaskmanagementAPP',
    });
  }

  async validate(payload: jwtPayload): Promise<User> {
    const { username } = payload;
    const user = this.userEntity.findOne({ where: { username } });
    if (!username) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
