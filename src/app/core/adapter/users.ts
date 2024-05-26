import { IUsers } from '../models/users';

export interface IUser {
  email: string;
  password: string;
}
export interface Data {
  accessToken: string;
  refreshToken: string;
  id: string;
  role: string;
}
export interface ApiResponseV1 {
  success: boolean;
  message: string;
  data: Data;
}
export interface ApiResponseV2 {
  success: boolean;
  message: string;
  data: IUsers;
}
export type ApiResponse = ApiResponseV1 | ApiResponseV2;

export interface UsersState {
  loading: boolean;
  auth: ApiResponse | null;
  user: IUsers | null;
  users: IUsers[];
  error?: string;
}
