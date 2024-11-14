export interface UserType {
  id?: string;
  email: string;
  password: string;
  activationToken?: string | null;
  createdAt?: string;
  role: 'admin' | 'customer' | 'master';
}
