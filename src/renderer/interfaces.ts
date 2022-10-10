export interface IProvider {
  id: string;
  legalName: string;
  tradingName: string;
  orgId: number;
  extId: string;
  phoneNumber: string;
  email: string;
  website: string;
  address: Address;
}

export interface Address {
  addressLine1: string;
  suburb: string;
  state: string;
  postCode: string;
}

export interface User {
  id?: string;
  email: string;
  name: string;
  defaultProvider: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  pool: string;
}

export interface LoginResponse {
  idToken: string;
  accessToken: string;
  role: string;
  username: string;
}
