import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({
    async: true
})
export class UniqueEmailValidator implements ValidatorConstraintInterface {

    constructor(private userRepository:UserRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const emailAlreadyUsed = await this.userRepository.emailAlreadyUsed(value);
        return !emailAlreadyUsed;
    }
    
}

export const UniqueEmail = (validationArguments: ValidationOptions) => {
    return (obj: Object, property: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: property,
            options: validationArguments,
            constraints: [],
            validator: UniqueEmailValidator
        });
    }
}
