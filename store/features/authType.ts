export interface User {
  id: string;
  phone_number: string;
  full_name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
