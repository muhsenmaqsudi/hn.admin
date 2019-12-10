import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../index';
import { myAxios } from '../../boot/axios';
import { UserProps, REQUEST_STATUS } from '../../types';

@Module({
  dynamic: true,
  name: 'user',
  namespaced: true,
  store: Store
})
export default class UserStore extends VuexModule {
  public users: UserProps[] = [];
  public loading: boolean = false;
  public status: keyof typeof REQUEST_STATUS = 'IDLE';
  private usersRoute: string = '/v1/users';

  @Mutation
  public SET_USERS(response: UserProps[]): void {
    this.users = response;
  }

  @Mutation
  public SET_LOADING(status: boolean): void {
    this.loading = status;
  }

  @Mutation
  public SET_STATUS(status: keyof typeof REQUEST_STATUS): void {
    this.status = status;
  }

  @Action
  public async getUsers(): Promise<void> {
    this.SET_LOADING(true);
    this.SET_STATUS('ONPROGRESS');
    await myAxios
      .get(this.usersRoute)
      .then(res => {
        this.SET_USERS(res.data.data);
        this.SET_LOADING(false);
        this.SET_STATUS('SUCCESS');
      })
      .catch(error => {
        console.log(error);
        this.SET_LOADING(false);
        this.SET_STATUS('FAILED');
      });
    this.SET_STATUS('IDLE');
  }
}
