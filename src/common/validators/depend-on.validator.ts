import { Injectable } from '@nestjs/common'
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator'

@ValidatorConstraint({ name: 'DependOn' })
@Injectable()
export class DependOnValidator implements ValidatorConstraintInterface {
    validate(value: unknown, setup: ValidationArguments) {
        if (value === undefined) {
            return true
        }

        const [dependOn] = setup.constraints
        const { object } = setup
        const dependOnValues = dependOn.map((key: string) => object[key])
        return dependOnValues.every((value: unknown) => value !== undefined && value !== null)
    }

    defaultMessage({ property, constraints }: ValidationArguments) {
        const msgs = constraints.flatMap((key: string) => `Property '${property}' is depend on '${key}'`)
        return msgs.join('\n')
    }
}

export function DependOn<T = any>(dependKeys: (keyof T)[] = [], validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'DependOn',
            target: object.constructor,
            constraints: [dependKeys],
            propertyName: propertyName,
            options: validationOptions,
            validator: DependOnValidator,
        })
    }
}
