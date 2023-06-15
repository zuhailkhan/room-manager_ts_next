export interface IPerson {
    username: string;
    email: string;
    password: string;
    role: {
        id: number,
        name: string
    }
}