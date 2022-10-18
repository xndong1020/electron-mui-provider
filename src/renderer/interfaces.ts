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

export interface IProviderViewData extends IProvider {
  errors?: string[];
}

export interface Address {
  addressLine1: string;
  suburb: string;
  state: string;
  postCode: string;
}

export interface IUser {
  email: string;
  name: string;
  defaultProvider: string;
  role: string;
}

export interface IUserViewData extends IUser {
  errors?: string[];
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

export interface IUser {
  email: string;
  name: string;
  defaultProvider: string;
  role: string;
}

export interface CreateUserResponse extends IUser {
  id: string;
}

export interface CreateProviderResponse extends IProvider {
  allowEditProfile: boolean;
}
