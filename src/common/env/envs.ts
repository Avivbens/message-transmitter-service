import { EnvVariables } from './env-variables'

export enum Envs {
    Testing = 'test',
    Staging = 'stg',
    Production = 'prod',
}

export function selectEnv(): string[] {
    const prefix = 'environment'
    const currentEnv = process.env[EnvVariables.NODE_ENV] || Envs.Testing
    return [`${prefix}/.secret.${currentEnv}.env`, `${prefix}/.${currentEnv}.env`, `${prefix}/.env`]
}
