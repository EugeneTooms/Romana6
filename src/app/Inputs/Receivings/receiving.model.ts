export interface Receiving {
  id: number;
  supplier_id: string;
  supplier_name?: string;
  price_buy?: number;
  price_sell?: number;
  number: string;
  date?: Date;
  document_Date?: Date;
  posted?: number;
}
