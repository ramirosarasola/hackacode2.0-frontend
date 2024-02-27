export interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  lastname: string;
  dni: string;
  phone: string;
  address: string;
  country: string;
  position: string;
  birthdate: string;
  salary: number;
}

export interface CustomError {
  message: string;
  status?: number;
  error?: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: CustomError | null;
}