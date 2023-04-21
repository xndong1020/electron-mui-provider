export interface IProvider {
  id: string;
  legalName: string;
  tradingName: string;
  orgId?: number;
  extId: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
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

export interface ProviderSimple {
  id: string;
  name: string;
}

export interface Credential {
  id: string;
  provider: string;
  title: string;
  courseCode: string;
  level: string;
  price: number;
  language: string;
  status: string;
  published?: boolean;
  hasNoActiveSessions?: boolean;
  createdAt: string;
}

export interface GetAllCredsResponse {
  total: number;
  providers: ProviderSimple[];
  credentials: Credential[];
}

export interface ICredentialFull {
  courseCode: string;
  status: string;
  hasNoActiveSessions: boolean;
  publishedUrl: string;
  published: boolean;
  data: Data;
  history: History[];
  comments: any[];
  users: User | undefined[];
}

export interface Data {
  assessments: Assessment[];
  sessions: Session[];
  level: string;
  apply: Apply;
  discountDesc: DiscountDesc;
  about: About;
  commitment: string;
  academics: Academic[];
  language: string;
  syllabuses: Bus[];
  title: string;
  recognitions: Recognition[];
  duration: Duration;
  skills: Skill[];
  price: number;
  industries: string[];
  deliveryDesc: DeliveryDesc;
  discountIndicator: boolean;
  conditions: Condition[];
  creditIndicator: boolean;
  stackableIndicator: boolean;
  priceGstIndicator?: boolean;
  outcome: Outcome[];
}

export interface Assessment {
  title: string;
  desc: string;
}

export interface Session {
  campusId: string;
  deliveryMode: DeliveryMode;
  flexibleIndicator: boolean;
}

export interface DeliveryMode {
  type: string;
}

export interface Apply {
  url: string;
}

export interface DiscountDesc {
  discountDescP1: any;
}

export interface About {
  tagline: string;
  descriptionP1: string;
}

export interface Academic {
  name: string;
  title: string;
  aboutP1: string;
  url: string;
}

export interface Bus {
  title: string;
  description: string;
}

export interface Recognition {
  type: string;
  title: string;
  description: string;
}

export interface Duration {
  totalDays: number;
  value: number;
  unit: string;
}

export interface Skill {
  name: string;
}

export interface DeliveryDesc {
  deliveryDescP1: string;
}

export interface Condition {
  conditions: Condition2[];
}

export interface Condition2 {
  type: string;
  description: string;
}

export interface Outcome {
  title: string;
}

export interface History {
  action: string;
  user: string;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
