

export interface LoginData {
    readonly email: string;
    readonly password: string
}


export interface JwtToken {
    readonly data: Object;
    readonly responseDescription: string;
    readonly responseCode: string;
}