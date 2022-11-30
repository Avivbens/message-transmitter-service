import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { selectEnv } from '../env'
import { createEnvsProviders } from './decorators'

@Module({})
export class AppConfigModule {
    static forRoot(): DynamicModule {
        const ENVS_PROVIDERS = createEnvsProviders()

        return {
            module: AppConfigModule,
            imports: [
                ConfigModule.forRoot({
                    envFilePath: selectEnv(),
                    isGlobal: true,
                }),
            ],
            providers: [...ENVS_PROVIDERS],
            exports: [...ENVS_PROVIDERS],
            global: true,
        }
    }
}
