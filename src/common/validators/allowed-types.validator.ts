import { Injectable } from '@nestjs/common'
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator'

@ValidatorConstraint({ name: 'AllowedTypes' })
@Injectable()
export class AllowedTypesValidator implements ValidatorConstraintInterface {
    validate(value: unknown, setup: ValidationArguments) {
        const [allowedTypes]: AllowedTypes[] = setup.constraints

        return allowedTypes.some((allowedType) => {
            const isSameType = typeof allowedType() === typeof value
            return isSameType
        })
    }

    defaultMessage({ property, constraints }: ValidationArguments) {
        return `Property '${property}' is not allowed type. Allowed types: ${constraints.join(', ')}`
    }
}

type AllowedTypes = (typeof String | typeof Number | typeof Boolean | typeof Array)[]

export function AllowedTypes(allowedTypes: AllowedTypes = [], validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'AllowedTypes',
            target: object.constructor,
            constraints: [allowedTypes],
            propertyName: propertyName,
            options: validationOptions,
            validator: AllowedTypesValidator,
        })
    }
}
