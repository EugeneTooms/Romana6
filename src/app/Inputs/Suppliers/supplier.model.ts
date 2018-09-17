export interface Supplier {
  id: number;
  name: string;
  oib: string;
  address?: string;
  city?: string;
  phone?: string;
  display?: string;
  zip?: number;
  contact_person?: string;
  bank_account?: string;
  email?: string;
  note?: string;
}
