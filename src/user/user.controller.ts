import { Body, Controller, Logger, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserExistsGuard } from '../auth/user-exists.guard'
import { CurrentUser } from '../common/decorators'
import { UserEditDto } from './dto/edit-user.dto'
import { User } from './models/user.model'
import { UsersService } from './services/users.service'

@ApiTags(UserController.name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, UserExistsGuard)
@Controller('user')
export class UserController {
    private readonly logger: Logger = new Logger(UserController.name)

    constructor(private readonly service: UsersService) {}

    @ApiBody({ type: () => UserEditDto })
    @Put()
    updateUserProfile(@CurrentUser() user: User, @Body() updatedUser: Partial<UserEditDto>) {
        this.logger.log(`Updating user ${user._id}`)

        this.service.updateByUser(updatedUser, user._id as string)
        return user
    }
}
