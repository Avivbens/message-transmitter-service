import { InjectEnv } from '@common/app-config/decorators'
import { EnvVariables } from '@common/env'
import { Injectable, Logger } from '@nestjs/common'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { TokenPayload } from '../models/token.model'

@Injectable()
export class PermissionService {
    private readonly logger: Logger = new Logger(PermissionService.name)
    constructor(@InjectEnv(EnvVariables.SECRET) private readonly SECRET: string) {}

    public generateJWTToken() {
        try {
            this.logger.debug('Generating JWT token')
            const payload: TokenPayload = { time: new Date() }
            const token: string = sign(payload, this.SECRET, { expiresIn: '15m', algorithm: 'HS256' })

            return token
        } catch (error) {
            this.logger.error(`Error while generating JWT token: ${error.stack}`)
            throw error
        }
    }

    public validateJWTToken(token: string): boolean {
        try {
            const isValid: TokenPayload = verify(token, this.SECRET, { algorithms: ['HS256'] }) as TokenPayload
            return !!isValid
        } catch (error) {
            this.logger.warn(`Error while validating JWT token: ${error.stack}`)
            return false
        }
    }
}
