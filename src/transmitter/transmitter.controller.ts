import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { MessageDto } from './dto/message.dto'
import { WildDto } from './dto/wild.dto'
import { PermissionGuard } from './guards/permission.guard'
import { PermissionService } from './services/permission.service'
import { TransmitterGateway } from './transmitter.gateway'

@ApiTags(TransmitterController.name)
@ApiBearerAuth()
@Controller('transmitter')
export class TransmitterController {
    private readonly logger: Logger = new Logger(TransmitterController.name)
    constructor(private readonly gateway: TransmitterGateway, private readonly permissionService: PermissionService) {}

    @UseGuards(PermissionGuard)
    @Post('spin')
    sendToRandomClient(@Body() body: MessageDto) {
        const { message } = body
        this.gateway.emitToRandomClient<string>(message)

        return { message: 'OK', sent: true }
    }

    @UseGuards(PermissionGuard)
    @Post('wild')
    sendToFewRandomClients(@Body() body: WildDto) {
        const { message, clientsAmount } = body
        this.gateway.emitToRandomClients<string>(message, clientsAmount)

        return { message: 'OK', sent: true }
    }

    @UseGuards(PermissionGuard)
    @Post('blast')
    sendToAllClients(@Body() body: MessageDto) {
        const { message } = body
        this.gateway.emitToAll<string>(message)

        return { message: 'OK', sent: true }
    }

    @Post('create-session-token')
    generateToken() {
        const token = this.permissionService.generateJWTToken()
        return { token }
    }
}
