import { Inject, Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvVariables } from '../../env'

const PROVIDER_PREFIX: (name: string) => string = (name: string) => `[InjectEnv]${name}`
const ENV_VARIABLES: EnvVariables[] = []

function envProvider(variable: EnvVariables): Provider {
    return {
        provide: PROVIDER_PREFIX(variable),
        useFactory: (conf: ConfigService) => {
            const envVariable = conf.get<unknown>(variable)
            return envVariable
        },
        inject: [ConfigService],
    }
}

export function createEnvsProviders(): Provider<unknown>[] {
    const providers = ENV_VARIABLES.map((variable) => envProvider(variable))
    return providers
}

export const InjectEnv = (variable: EnvVariables): ParameterDecorator => {
    !ENV_VARIABLES.includes(variable) && ENV_VARIABLES.push(variable)
    return Inject(PROVIDER_PREFIX(variable))
}
