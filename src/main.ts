import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { Envs, EnvVariables } from './common/env'
;(async () => {
    const app = await NestFactory.create(AppModule)
    const conf = await app.resolve<ConfigService>(ConfigService)

    const microservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.REDIS,
        options: {
            host: 'localhost',
            port: 6379,
        },
    })

    const prefix = conf.get(EnvVariables.APP_PREFIX)
    const port = +conf.get(EnvVariables.APP_PORT)
    const host = conf.get(EnvVariables.APP_HOST)
    const env = conf.get(EnvVariables.NODE_ENV, Envs.Production)

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )
    app.setGlobalPrefix(prefix)
    app.enableCors()
    app.enableVersioning({ prefix: 'v', defaultVersion: '1', type: VersioningType.URI })

    if (env !== Envs.Production) {
        const config = new DocumentBuilder().setTitle('MICRO SERVICE API').setVersion('1.0').addBearerAuth().build()
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('api', app, document)
    }

    await app.startAllMicroservices()
    await app.listen(process.env.PORT || port, host)
})().catch((err) => console.error(err.stack))
