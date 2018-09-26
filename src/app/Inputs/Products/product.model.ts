import { ProductDetails } from './product-details.model';

export interface Product {
  id: number;
  name: string;
  tax_group_id: number;
  price: number;
  price_1: number;
  price_2: number;
  price_3: number;
  price_4: number;
  articles: ProductDetails[];
}
