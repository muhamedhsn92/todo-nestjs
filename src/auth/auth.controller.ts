import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user-db/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
        // if (!username) {
        //     throw new UnauthorizedException('invalid username');
        // }
    }
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('first >>> log', user);
    }
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@User() user,@Req() req) {
    //     console.log('first >>> log', user);
    //     console.log('first >>> log', req);
    // }
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@Req() req) {
    //     console.log('req', req);
    // }
    // @Get('/abc')
    // async findOne(@User() user) {
    //     console.log(user);
    // }


}
