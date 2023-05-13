export interface AuthenticatedUser  {
    uid?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: number;
    membership: number;
};