import { ObjectId } from 'mongodb'

export interface User extends NewUser {
    _id: string | ObjectId
    userLimits?: UserLimits
    iat: number
    userPreferences: any
}

export interface NewUser {
    username: string
    email: string
    password: string
    phoneNumber: string
    isAdmin?: boolean
    companyId: string
    createdAt: Date
}

export interface UserLimits {
    queryLimit?: number
    passSingleLogin?: boolean
}

export interface UpdateUser extends Omit<User, 'userLimits'> {
    userLimits?: UserLimitsEdit[]
}

export interface UserLimitsEdit {
    key: string
    value: boolean
}
