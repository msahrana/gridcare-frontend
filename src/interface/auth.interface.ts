import { UserRole, UserStatus } from "@/types";

export interface ICredentialRegister {
    name: string;
    email: string;
    password: string;
}

export interface ICredentialLogin {
    email: string;
    password: string;
}

export interface ICredentialVerifyOTP {
    email: string;
    otp: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    googleId: null | string;
    authProvider: string;
    emailVerified: boolean;
    role: UserRole;
    status: UserStatus;
    needPasswordChange: boolean;
    imageUrl: null | string;
    imagePublicId: null | string;
    isDeleted: boolean;
    deletedAt: null | string;
    createdAt: string;
    updatedAt: string;
}