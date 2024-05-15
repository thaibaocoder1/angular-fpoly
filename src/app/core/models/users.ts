export interface IUsers {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  role: string;
  isActive: boolean;
  imageUrl: {
    data: string;
    contentType: string;
    fileName: string;
  };
  refreshToken: string;
  resetedAt?: number;
  createdAt: string;
  updatedAt: string;
}
