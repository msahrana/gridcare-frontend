export type UserRole = 'ADMIN' | 'OPERATOR' | 'TECHNICIAN' | 'CUSTOMER';

export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'DELETED';

export type TechnicianStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE';

export type TechnicianVerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type FeederStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

export type OutageType = 'PLANNED' | 'UNEXPECTED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AuthProvider = 'GOOGLE' | 'CREDENTIAL';

export type OutagePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type OutageStatus =
    | 'REPORTED'
    | 'VERIFIED'
    | 'ASSIGNED'
    | 'IN_PROGRESS'
    | 'RESTORED'
    | 'CLOSED'
    | 'CANCELLED';

export type AssignmentStatus =
    | 'ASSIGNED'
    | 'ACCEPTED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED';

export type OutageAssignmentStatus =
    | 'ASSIGNED'
    | 'ACCEPTED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED';
