import { Logger } from '@nestjs/common'
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { EVENT_NAME } from './transmitter.config'

@WebSocketGateway()
export class TransmitterGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger: Logger = new Logger(TransmitterGateway.name)

    @WebSocketServer()
    private readonly server: Server

    handleConnection(client: Socket): void {
        const { id } = client
        this.logger.log(`Client connected: ${id}, clients amount: ${this._clientsAmout}`)
    }

    handleDisconnect(client: Socket): void {
        const { id } = client
        this.logger.log(`Client disconnected: ${id}, clients amount: ${this._clientsAmout}`)
    }

    public emitToClient<T = unknown>(clientId: string, data: T): void {
        try {
            this.logger.debug(`Emitting to client: ${clientId}`)
            const client = this._getSocketById(clientId)
            if (!client) {
                return
            }
            client.emit(EVENT_NAME, data)
        } catch (error) {
            this.logger.error(`Error while emitting to client: ${clientId}`, error)
            throw error
        }
    }

    public emitToAll<T = unknown>(data: T) {
        try {
            this.logger.debug(`Emitting to all clients`)
            this.server.emit(EVENT_NAME, data)
        } catch (error) {
            this.logger.error(`Error while emitting to all clients`, error)
            throw error
        }
    }

    public emitToRandomClient<T = unknown>(data: T): void {
        try {
            this.logger.debug(`Emitting to random client`)
            const randomClientId = this._getRandomClientId()
            if (!randomClientId) {
                this.logger.warn(`No clients connected`)
                return
            }

            this.emitToClient(randomClientId, data)
        } catch (error) {
            this.logger.error(`Error while emitting to random client`, error)
            throw error
        }
    }

    public emitToRandomClients<T = unknown>(data: T, clientsAmount: number): void {
        try {
            this.logger.debug(`Emitting to random clients`)
            const randomClientsIds = this._getRandomClientsIds(clientsAmount)
            randomClientsIds.forEach((clientId) => this.emitToClient(clientId, data))
        } catch (error) {
            this.logger.error(`Error while emitting to random clients`, error)
            throw error
        }
    }

    private _getRandomClientsIds(clientsAmount: number): string[] {
        const clientsIds = Array.from(this._socketsMap.keys())
        const randomClientsIds: Set<string> = new Set<string>()
        for (let i = 0; i < clientsAmount; i++) {
            const randomIndex: number = Math.floor(Math.random() * clientsIds.length)
            const randomId: string = clientsIds[randomIndex]

            clientsIds.splice(randomIndex, 1)
            randomId && randomClientsIds.add(randomId)
        }
        return Array.from<string>(randomClientsIds)
    }

    private _getRandomClientId(): string {
        const randomIndex: number = Math.floor(Math.random() * this._clientsAmout)
        const clientsIds = Array.from(this._socketsMap.keys())
        return clientsIds[randomIndex]
    }

    private _getSocketById(id: string): Socket {
        return this._socketsMap.get(id)
    }

    private get _socketsMap(): Map<string, Socket> {
        return this.server.sockets.sockets
    }

    private get _clientsAmout(): number {
        return this._socketsMap.size
    }
}
