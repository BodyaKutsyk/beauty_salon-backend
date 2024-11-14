import { CustomerType } from './CustomerType.js';

export interface AdminType extends CustomerType {
  phone: string;
}
