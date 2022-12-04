import { Module } from '@nestjs/common'
import { AppConfigModule } from './common/app-config/app-config.module'
import { TransmitterModule } from './transmitter/transmitter.module'

@Module({
    imports: [AppConfigModule.forRoot(), TransmitterModule],
})
export class AppModule {}
