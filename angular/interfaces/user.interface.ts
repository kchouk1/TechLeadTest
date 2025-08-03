export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
}

export interface ChangePasswordRequest {
  id: number;
  password: string;
}
