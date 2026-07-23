export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  tokenType: string;
  user: UserInfo;
}