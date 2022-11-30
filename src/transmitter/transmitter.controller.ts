import { JwtAuthGuard } from '@auth/jwt-auth.guard'
import { UserExistsGuard } from '@auth/user-exists.guard'
import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { MessageDto } from './dto/message.dto'
import { WildDto } from './dto/wild.dto'
import { TransmitterGateway } from './transmitter.gateway'

@ApiTags(TransmitterController.name)
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, UserExistsGuard)
@Controller('transmitter')
export class TransmitterController {
    private readonly logger: Logger = new Logger(TransmitterController.name)
    constructor(private readonly gateway: TransmitterGateway) {}

    @Post('spin')
    sendToRandomClient(@Body() body: MessageDto) {
        const { message } = body
        this.gateway.emitToRandomClient<string>(message)

        return { message: 'OK', sent: true }
    }

    @Post('wild')
    sendToFewRandomClients(@Body() body: WildDto) {
        const { message, clientsAmount } = body
        this.gateway.emitToRandomClients<string>(message, clientsAmount)

        return { message: 'OK', sent: true }
    }

    @Post('blast')
    sendToAllClients(@Body() body: MessageDto) {
        const { message } = body
        this.gateway.emitToAll<string>(message)

        return { message: 'OK', sent: true }
    }
}
