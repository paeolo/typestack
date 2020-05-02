import { observable, action, computed } from 'mobx';
import { UserController } from '@openapi/routes'
import { User, LoginCredentials } from '@openapi/schemas'

export class UserStore {

  @observable currentUser: User | undefined = undefined;

  @computed get isLogin() {
    return this.currentUser !== undefined;
  }

  @action
  login = async (credentials: LoginCredentials, remember?: boolean) => {
    await UserController.login(credentials, remember);
    this.currentUser = await UserController.currentUser();
  }

  @action
  autologin = async () => {
    await UserController.autologin();
    this.currentUser = await UserController.currentUser();
  }

  @action
  logout = async () => {
    await UserController.logout();
    this.currentUser = undefined;
  }
}
