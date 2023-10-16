export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type ResponseErrorType = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  contactNo: string;
  address: string;
  profileImg: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  services?: IService[];
  bookings?: IBooking[];
  reviews?: IReview[];
  feedback?: IFeedback[];
}

export interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
  bookings?: IBooking[];
  reviews?: IReview[];
  feedbacks?: IFeedback[];
}

export interface IBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  userId: string;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
  service?: IService;
}

export interface IReview {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  serviceId: string;
  user?: IUser;
  service?: IService;
}

export interface IFeedback {
  id: string;
  message: string;
  userId: string;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
  service?: IService;
}

export interface IContent {
  id: string;
  title: string;
  content: string;
  type: ContentType;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  CLIENT = "CLIENT",
  PHOTOGRAPHER = "PHOTOGRAPHER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum BookingStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  ADJUSTED = "ADJUSTED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum ContentType {
  BLOG = "BLOG",
  FAQ = "FAQ",
}
