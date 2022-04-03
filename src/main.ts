import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() 
{
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('TipTop Backend')
        .setDescription('A NestJS API for the TipTop cleaning platform.')
        .setVersion('1.0')
        .addTag('tiptop')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || environment.API_PORT;

    await app.listen(port);
}
bootstrap();
