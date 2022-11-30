import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { MessageDto } from './message.dto'

export class WildDto extends MessageDto {
    @ApiProperty({ example: 2, required: true })
    @IsNumber()
    @IsNotEmpty()
    clientsAmount: number
}
