export interface IUser {
    id: number;
    email: string;
    role: string;
}

export interface IType {
    id: number;
    name: string;
    query: string;
}

export interface IBrand {
    id: number;
    name: string;
    query: string;
}

export interface IDevice {
    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
}