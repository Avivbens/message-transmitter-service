import { Controller, Logger } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { TransmitterGateway } from './transmitter.gateway'
import { EMIT_ALL } from './transport.event'

@Controller()
export class TransportController {
    private readonly logger: Logger = new Logger(TransportController.name)
    constructor(private readonly gateway: TransmitterGateway) {}

    @EventPattern(EMIT_ALL)
    async handleEmit(message: string) {
        try {
            this.logger.debug(`Emitting to all clients`)
            this.gateway.emitToAll<string>(message)
        } catch (error) {
            this.logger.error(`Error while emitting to all clients, error: ${error.stack}`)
        }
    }
}
