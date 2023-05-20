import { BaseService } from './BaseService';

export class GetStartedService extends BaseService {
  constructor() {
    super();
  }
  chooseGetStarted = (number: Number) => {
    return this.post(`/getstarted`, number);
  };
  chooseInterest = (interest: any) => {
    return this.post(`/users/expertise`, interest);
  };
  getShouldFollower = () => {
    return this.get(`/user/shouldFollow`);
  };
  chooseShouldFollowPeople = (arrPeople: any) => {
    return this.post(`/interest`, arrPeople);
  };
}

export const getStartedService = new GetStartedService();
