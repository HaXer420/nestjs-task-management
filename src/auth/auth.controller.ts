import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDTO);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signin(authCredentialDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  async test(@GetUser() user: User) {
    console.log(user);
  }
}
