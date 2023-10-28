export interface IUser {
    Id: number;
    Name: string;
    email: string;
    lastName: string;
    status: number;
    rolId: number;
    userName: string;
    updateAt: Date;
    createAt: Date;
    password: string;
    token_Password: null;
}

export interface IToken {
    Token: string
};