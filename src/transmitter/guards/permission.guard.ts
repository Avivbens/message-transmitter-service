import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PermissionService } from '../services/permission.service'

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly permissionService: PermissionService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const token: string = request.headers.authorization

        const jwt = token?.replace('Bearer ', '')

        return this.permissionService.validateJWTToken(jwt)
    }
}
