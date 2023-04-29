import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  constructor() {
    super();
  }

  registerUser = (userRegister: any) => {
    return this.post(`/users`, userRegister);
  };
  updateUser = (userID: any, userUpdate: any) => {
    return this.put(`/users/${userID}`, userUpdate);
  };
}

export const userService = new UserService();
