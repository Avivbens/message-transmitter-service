import { Module } from '@nestjs/common'
import { TransmitterController } from './transmitter.controller'
import { TransmitterGateway } from './transmitter.gateway'
import { PermissionService } from './services/permission.service'

@Module({
    providers: [TransmitterGateway, PermissionService],
    controllers: [TransmitterController],
})
export class TransmitterModule {}
