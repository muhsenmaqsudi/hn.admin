import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../index';
import LoginDTO from '../../interfaces/LoginDTO.interface';
import AuthResponse from '../../interfaces/AuthResponse.interface';

@Module({
  dynamic: true,
  name: 'auth',
  namespaced: true,
  store: Store
})
export default class AuthStore extends VuexModule {
  public loginDTO: LoginDTO = {
    username: null,
    password: null,
    client_id: 1,
    client_secret: 'IxcIsKxMAf4mMIa3swAgxxhk71pZtcwCsX24jLuF',
    grant_type: 'scope',
    push_client_id: 'nothing',
    type: 'admin'
  };

  public accessToken: string = localStorage.getItem('accessToken') || '';
  public expiresIn: number | null = null;
  public refreshToken: string | null = null;
  public tokenType: string | null = null;
  public status = '';

  public get isAuthenticated() {
    return !!this.accessToken;
  }

  public get authStatus() {
    return this.status;
  }

  @Mutation
  public SET_LOGIN_DTO(data: LoginDTO) {
    const { username, password } = data;
    this.loginDTO.username = username;
    this.loginDTO.password = password;
  }

  @Mutation
  public SET_STATUS(status: string) {
    this.status = status;
  }

  @Mutation
  public SET_TOKEN(authResponse: AuthResponse) {
    this.accessToken = authResponse.access_token;
    this.refreshToken = authResponse.refresh_token;
    this.expiresIn = authResponse.expires_in;
    this.tokenType = authResponse.token_type;
    localStorage.setItem('accessToken', authResponse.access_token);
  }

  @Action
  public setLoginDTO(data: LoginDTO) {
    this.SET_LOGIN_DTO(data);
  }

  // @Action
  // public checkAuth(data: LoginDTO) {

  // }
}
