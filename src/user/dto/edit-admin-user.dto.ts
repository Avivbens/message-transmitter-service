import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, IsBoolean, ValidateNested, IsEnum } from 'class-validator'

export class UserAdminEditDto implements UserAdminEdit {
    @ApiProperty({ example: 'username' })
    @IsOptional()
    @IsString()
    username?: string

    @ApiProperty({ example: 'email@google.com' })
    @IsOptional()
    @IsString()
    email?: string

    @ApiProperty({ example: '123456' })
    @IsOptional()
    @IsString()
    phoneNumber?: string

    @ApiProperty({ example: false })
    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean

    @IsOptional()
    @Type(() => UserLimitsEditDto)
    @ValidateNested({ each: true })
    userLimits?: { key: string; value: boolean }[]
}

export interface UserAdminEdit {
    username?: string
    email?: string
    phoneNumber?: string
    isAdmin?: boolean
    userLimits?: { key: string; value: boolean }[]
}

export enum UserLimitsEditKeys {
    SINGLE_LOGIN = 'passSingleLogin',
}

export class UserLimitsEditDto implements UserLimitsEdit {
    @IsEnum(UserLimitsEditKeys)
    key: string

    @IsBoolean()
    value: boolean
}

export interface UserLimitsEdit {
    key: string
    value: boolean
}
