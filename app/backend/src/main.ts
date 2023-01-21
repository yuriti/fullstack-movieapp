import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "~/app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: [process.env.PUBLIC_URL],
            credentials: true,
        },
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const config = new DocumentBuilder()
        .setTitle("Movie APP")
        .setDescription("Define your genre of films")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(3000);
}
bootstrap();
