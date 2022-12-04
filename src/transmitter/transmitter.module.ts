import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PermissionService } from './services/permission.service'
import { TRANSMITTER_CLIENT } from './transmitter.config'
import { TransmitterController } from './transmitter.controller'
import { TransmitterGateway } from './transmitter.gateway'
import { TransportController } from './transport.controller'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: TRANSMITTER_CLIENT,
                transport: Transport.REDIS,
                options: {
                    host: 'localhost',
                    port: 6379,
                },
            },
        ]),
    ],
    providers: [TransmitterGateway, PermissionService],
    controllers: [TransmitterController, TransportController],
})
export class TransmitterModule {}
