export interface UserData {
  name: string;
  username: string;
  number: string;
  email: string;
  status: number;
  otp: string | null;
  created: string;
}

export interface LoginResponse {
  DataReq: string;
  status: boolean;
  text: string;
  session_id: string;
  userID: number;
  role: string;
  data: UserData;
}

export interface SessionValidationResponse {
  DataReq: string;
  valid: boolean;
  text: string;
  session_id: string;
  userID: string;
  role: string;
  data: UserData;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  DataReq: string;
  status: boolean;
  text: string;
  session_id: string;
  userID: number;
  role: string;
  data: {
    name: string;
    username: string;
    number: string;
    email: string;
    status: number;
    otp: string | null;
    created: string;
  };
}
