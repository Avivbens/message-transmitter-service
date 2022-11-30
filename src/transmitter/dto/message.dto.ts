import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { IMessage } from '../models/message.model'

export class MessageDto implements IMessage {
    @ApiProperty({ example: 'Hello world!', required: true })
    @IsString()
    @IsNotEmpty()
    message: string
}
