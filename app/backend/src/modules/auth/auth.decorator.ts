import { ExecutionContext, createParamDecorator } from "@nestjs/common";

import { Request } from "express";

export const AuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<Request>()?.user
);
