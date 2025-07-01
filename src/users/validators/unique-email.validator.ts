import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user.entity";
import { Repository } from "typeorm";

@Injectable()
@ValidatorConstraint({
    async: true
})
export class UniqueEmailValidator implements ValidatorConstraintInterface {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email: value } });
        return !user;
    }

}

export function UniqueEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator,
        });
    };
}
