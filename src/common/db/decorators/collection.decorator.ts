import { Inject, Provider } from '@nestjs/common'
import { Collection, Db } from 'mongodb'
import { Collections } from '../collections'

const PROVIDER_PREFIX: (name: string) => string = (name: string) => `[injectCollection]${name}`
const COLLECTIONS: Collections[] = []

function collectionProvider(collectionName: Collections): Provider {
    return {
        provide: PROVIDER_PREFIX(collectionName),
        useFactory: (db: Db) => {
            const collection = db.collection(collectionName)
            return collection
        },
        inject: [Db],
    }
}

export function createCollectionsProviders(): Provider<Collection>[] {
    const providers = COLLECTIONS.map((collectionName) => collectionProvider(collectionName))
    return providers
}

export const InjectCollection = (collectionName: Collections): ParameterDecorator => {
    !COLLECTIONS.includes(collectionName) && COLLECTIONS.push(collectionName)
    return Inject(PROVIDER_PREFIX(collectionName))
}
