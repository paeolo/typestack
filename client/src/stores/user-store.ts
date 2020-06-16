import { observable, action, computed } from 'mobx';
import { obtain, UserController } from '@openapi/.';
import { User, LoginCredentials, UserRole } from '@openapi/schemas';
import { injectable } from 'inversify';

@injectable()
export class UserStore {

  @observable currentUser: User | undefined = undefined;

  @computed get isLogged() {
    return this.currentUser !== undefined;
  }

  @computed get isAdmin() {
    return this.currentUser !== undefined
      && this.currentUser.role === UserRole.ADMIN;
  }

  @action
  login = async (credentials: LoginCredentials, remember?: boolean) => {
    await UserController.login(credentials, remember);
    this.currentUser = await obtain(UserController.currentUser());
  }

  @action
  autologin = async () => {
    if (this.currentUser !== undefined) {
      try {
        await UserController.autologin();
        this.currentUser = await obtain(UserController.currentUser());
      } catch (error) {
        if (error.status == 401)
          this.currentUser = undefined;
      }
    }
  }

  @action
  logout = async () => {
    await UserController.logout();
    this.currentUser = undefined;
  }
}
