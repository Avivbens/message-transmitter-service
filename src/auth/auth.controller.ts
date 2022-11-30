import { BadRequestException, Body, Controller, Ip, Logger, Post } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { User } from '../user/models/user.model'
import { CurrentUser } from '../common/decorators'
import { AuthService } from './auth.service'
import { CredentialsDto } from './dto/credentials.dto'
import { NewUserDto } from './dto/user.dto'
import { UsersService } from 'src/user/services/users.service'

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
    private readonly logger: Logger = new Logger(AuthController.name)

    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    @ApiBody({ type: () => CredentialsDto })
    @Post('login')
    async login(@Body() credentials: CredentialsDto, @Ip() ip: string) {
        this.logger.log(`Login attempt from ${ip}, email: ${credentials.email}`)
        if (!credentials) {
            throw new BadRequestException()
        }

        return this.authService.login(credentials)
    }

    @Post('logout')
    async logout(@CurrentUser() user: User) {
        this.logger.debug(`User ${user.email} logout`)
        return this.authService.logout()
    }

    @ApiBody({ type: () => NewUserDto })
    @Post('signup')
    async signup(@Body() user: NewUserDto, @CurrentUser() currUser: User, @Ip() ip: string) {
        this.logger.log(`Signing up user ${user.email}, admin is ${currUser.email} - ${currUser._id}, ip is ${ip}`)
        if (!user) {
            throw new BadRequestException()
        }

        return this.usersService.addUser(user)
    }
}
