import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle("Nest Generic Store Backend")
        .setDescription("This Is a Test Application For My NestJS Studies")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme();
    const darkTheme = theme.getBuffer(SwaggerThemeNameEnum.DARK);

    SwaggerModule.setup("api", app, document, {
        customCss: darkTheme,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );
    useContainer(app.select(AppModule), {
        fallbackOnErrors: true
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
