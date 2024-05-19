import { IUsers } from '../models/users';

type Data = {
  accessToken: string;
  expireIns: number;
  id: string;
  role: string;
};

interface ApiResponse {
  success: boolean;
  message: string;
  data?: Data;
}
export interface UsersState {
  loading: boolean;
  auth: ApiResponse | null;
  user: IUsers | null;
  users: IUsers[];
  error?: string;
}
