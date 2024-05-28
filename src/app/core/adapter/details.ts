import { IOrderDetails } from '../models/detail';

export interface OrderDetailState {
  loading: boolean;
  detail: IOrderDetails | null;
  details: IOrderDetails[];
  error?: string;
}

export interface ApiResponseOrderDetails {
  success: boolean;
  message: string;
  data: IOrderDetails | IOrderDetails[];
}
