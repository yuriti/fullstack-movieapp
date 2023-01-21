import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export class ValidationException extends BadRequestException {
    getResponse(): Record<string, string[]> {
        const data = super.getResponse() as { message: ValidationError[] };

        return data.message.reduce((data, error) => {
            const constraints = [];

            for (const key in error.constraints) {
                if (error.constraints[key].startsWith("validation.")) {
                    constraints.push(error.constraints[key]);
                } else {
                    constraints.push(key);
                }
            }

            return (data[error.property] = constraints), data;
        }, {});
    }
}
