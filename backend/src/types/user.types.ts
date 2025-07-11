import { Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: any[];
}
