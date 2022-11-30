import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AppConfigModule } from './common/app-config/app-config.module'
import { UsersModule } from './user/users.module'
import { TransmitterModule } from './transmitter/transmitter.module'

@Module({
    imports: [AppConfigModule.forRoot(), UsersModule.forRoot(), AuthModule, TransmitterModule],
})
export class AppModule {}
