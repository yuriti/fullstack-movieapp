import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

import { HttpAdapterHost } from "@nestjs/core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

interface AxiosError extends Error {
    isAxiosError: true;
    response: {
        status: HttpStatus;
    };
}

const isAxiosError = (error: Error): error is AxiosError => "isAxiosError" in error;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    async catch(exception: Error, host: ArgumentsHost): Promise<void> {
        if (host.getType() === "http") {
            this.catchHttp(exception, host);
        }
    }

    // Исключаем ошибочное поведение
    catchHttp(exception: Error, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        let httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            httpStatus = exception.getStatus();
        } else if (exception instanceof PrismaClientKnownRequestError) {
            switch (exception.code) {
                case "P2025":
                    httpStatus = HttpStatus.NOT_FOUND;
                    break;
                case "P2002":
                    httpStatus = HttpStatus.CONFLICT;
                    break;
                case "P2034":
                default:
                    httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
            }
        } else if (isAxiosError(exception)) {
            httpStatus = exception.response.status;
        }

        if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(exception);
        }

        httpAdapter.reply(ctx.getResponse(), undefined, httpStatus);
    }
}
