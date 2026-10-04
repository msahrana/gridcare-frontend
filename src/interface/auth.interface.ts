import { UserRole, UserStatus } from '@/types';

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

// export interface UsersParams {
//     page?: number;
//     limit?: number;
//     searchTerm?: string;
// }

// export interface IUserListResponse {
//     success: boolean;
//     statusCode: number;
//     message: string;
//     data: {
//         data: User[];
//         meta: {
//             page: number;
//             limit: number;
//             total: number;
//             totalPages: number;
//         };
//     };
// }

export interface IAllUsersResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: User[];
}
