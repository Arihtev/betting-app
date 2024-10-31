export interface AuthenticateRequest {
  username: string;
  password: string;
}

export interface AuthenticateResponse {
  token: string;
}
