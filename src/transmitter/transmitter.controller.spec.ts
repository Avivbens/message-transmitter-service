import { Test, TestingModule } from '@nestjs/testing'
import { TransmitterController } from './transmitter.controller'

describe('TransmitterController', () => {
    let controller: TransmitterController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransmitterController],
        }).compile()

        controller = module.get<TransmitterController>(TransmitterController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
