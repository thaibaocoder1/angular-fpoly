export interface IProducts {
  _id: string;
  categoryID: string;
  name: string;
  slug: string;
  description: string;
  code: string;
  price: number;
  discount: number;
  thumb: {
    data: Buffer;
    contentType: string;
    fileName: string;
  };
  content: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
