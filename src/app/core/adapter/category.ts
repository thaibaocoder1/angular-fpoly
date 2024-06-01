import { ICategory } from '../models/category';

export interface ApiResponseCategory {
  success: boolean;
  message: string;
  data: ICategory;
}
export interface CategoryState {
  loading: boolean;
  data: ApiResponseCategory | null;
  catalog: ICategory[];
  detail: ICategory | null;
  filter?: ICategory[];
  error: string;
}
