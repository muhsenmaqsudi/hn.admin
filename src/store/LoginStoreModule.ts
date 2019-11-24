import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from './index';
import LoginDTO from '../interfaces/LoginDTO.interface';

@Module({
  dynamic: true,
  name: 'login',
  namespaced: true,
  store: Store
})
export default class LoginStoreModule extends VuexModule {
  /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
  public loginDTO: LoginDTO = {
    username: null,
    password: null,
    client_id: 1,
    client_secret: 'IxcIsKxMAf4mMIa3swAgxxhk71pZtcwCsX24jLuF',
    grant_type: 'scope',
    push_client_id: 'nothing',
    type: 'admin'
  };

  @Mutation
  public SET_LOGIN_DTO(data: LoginDTO) {
    const { username, password } = data;
    this.loginDTO.username = username;
    this.loginDTO.password = password;
  }

  @Action
  public setLoginDTO(data: LoginDTO) {
    this.SET_LOGIN_DTO(data);
  }
}
