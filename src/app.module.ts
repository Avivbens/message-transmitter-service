import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AppConfigModule } from './common/app-config/app-config.module'
import { UsersModule } from './user/users.module'

@Module({
    imports: [AppConfigModule.forRoot(), UsersModule.forRoot(), AuthModule],
})
export class AppModule {}
