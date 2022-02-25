

export interface UserDetailsFromJwtToken {
    readonly email: string;
    readonly fullName: string;
    readonly account_type: string;
    readonly exp: any;
}