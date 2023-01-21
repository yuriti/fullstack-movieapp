import * as cookieParser from "cookie-parser";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "~/app.module";
import { COOKIE_AUTH } from "./modules/auth/auth.enum";
import { NestFactory } from "@nestjs/core";
import { ValidationException } from "./app/exceptions/validation.exception";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: [process.env.PUBLIC_URL],
            credentials: true,
        },
    });

    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({ exceptionFactory: (errors) => new ValidationException(errors), transform: true })
    );

    const config = new DocumentBuilder()
        .setTitle("Movie APP")
        .setDescription("Define your genre of films")
        .setVersion("1.0")
        .addCookieAuth(COOKIE_AUTH.ACCESS_TOKEN)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(3000);
}
bootstrap();
