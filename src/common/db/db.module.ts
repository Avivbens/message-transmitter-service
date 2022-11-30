import { DynamicModule, Module } from '@nestjs/common'
import { DB_PROVIDER } from './db.provider'
import { createCollectionsProviders } from './decorators/collection.decorator'

@Module({})
export class DbModule {
    static async register(): Promise<DynamicModule> {
        const COLLECTIONS_PROVIDERS = createCollectionsProviders()

        return {
            module: DbModule,
            providers: [DB_PROVIDER, ...COLLECTIONS_PROVIDERS],
            exports: [DB_PROVIDER, ...COLLECTIONS_PROVIDERS],
        }
    }
}
