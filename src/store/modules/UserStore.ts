import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../index';
import { myAxios } from '../../boot/axios';
import UserProps from '../../interfaces/UsersProps.interface';

@Module({
  dynamic: true,
  name: 'user',
  namespaced: true,
  store: Store
})
export default class UserStore extends VuexModule {
  public users: UserProps[] | [] = [];
  public loading: boolean = false;
  private usersGetRoute: string = '/v1/users';

  @Mutation
  public SET_USERS(response: UserProps[]) {
    this.users = response;
  }

  @Mutation
  public SET_LOADING(status: boolean) {
    this.loading = status;
  }

  @Action
  public async getUsers() {
    this.SET_LOADING(true);
    await myAxios
      .get(this.usersGetRoute)
      .then(res => {
        this.SET_USERS(res.data.data);
        this.SET_LOADING(false);
      })
      .catch(error => {
        console.log(error);
        this.SET_LOADING(false);
      });
  }
}
