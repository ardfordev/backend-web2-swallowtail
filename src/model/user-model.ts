import { User } from "@prisma/client";

export type UserResponse = {
  username: string;
  name: string;
  role: string;
  token?: string;
};

export type CreateUserRequest = {
  username: string;
  name: string;
  role: string;
  password: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  role?: string;
  password?: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
    role: user.role,
  };
}
