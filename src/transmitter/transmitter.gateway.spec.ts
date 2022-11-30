import { Test, TestingModule } from '@nestjs/testing'
import { TransmitterGateway } from './transmitter.gateway'

describe('TransmitterGateway', () => {
    let gateway: TransmitterGateway

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransmitterGateway],
        }).compile()

        gateway = module.get<TransmitterGateway>(TransmitterGateway)
    })

    it('should be defined', () => {
        expect(gateway).toBeDefined()
    })
})
