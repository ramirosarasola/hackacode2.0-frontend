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
  token: string;
}

export interface CustomError {
  message: string;
  status?: number;
  error?: string;
  success?: boolean;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: CustomError | null;
}

export interface Employee {
  id: number;
  user_id: number;
  name: string;
  lastname: string;
  address: string;
  dni: string;
  birthdate: string;
  country: string;
  phone: string;
  position: string;
  salary: number;
  createdAt: string;
  updatedAt: string;
}
