import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { NewUser, UserLimits } from '../../user/models/user.model'

export class NewUserDto implements Omit<NewUser, 'createdAt'> {
    @ApiProperty({ example: 'username' })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ example: 'email@google.com' })
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: '123456' })
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({ example: '053-3344556' })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean

    @ApiProperty({ example: '62a8982996f4494e1f628592' })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    companyId: string
}

export class UserLimitsDto implements UserLimits {
    @IsOptional()
    @IsNumber()
    queryLimit?: number

    @IsOptional()
    @IsBoolean()
    passSingleLogin?: boolean
}
