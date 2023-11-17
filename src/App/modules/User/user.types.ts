export interface IUser {
    id?: string;
    name: string,
    email: string,
    role: 'admin' | 'customer',
    contactNo: string,
    address: string,
    profileImg: string
}