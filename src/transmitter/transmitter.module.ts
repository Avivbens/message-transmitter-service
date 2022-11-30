import { Module } from '@nestjs/common'
import { TransmitterController } from './transmitter.controller'
import { TransmitterGateway } from './transmitter.gateway'

@Module({
    providers: [TransmitterGateway],
    controllers: [TransmitterController],
})
export class TransmitterModule {}
