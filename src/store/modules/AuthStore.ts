import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../index';
import { LoginDTO, AuthDTO } from '../../types';
import db from '../../config/db';
import { myAxios } from '../../boot/axios';
import { Notify, LoadingBar } from 'quasar';

@Module({
  dynamic: true,
  name: 'auth',
  namespaced: true,
  store: Store
})
export default class AuthStore extends VuexModule {
  public defaultRoute: string = 'v1/oauth/token';

  public loginDTO: LoginDTO = {
    username: null,
    password: null,
    client_id: 1,
    client_secret: 'IxcIsKxMAf4mMIa3swAgxxhk71pZtcwCsX24jLuF',
    grant_type: 'scope',
    push_client_id: 'nothing',
    type: 'admin'
  };

  public authToken: AuthDTO = db.get('authToken') || '';

  public get isAuthenticated() {
    return !!this.authToken;
  }

  @Mutation
  public SET_LOGIN_DTO(data: LoginDTO) {
    const { username, password } = data;
    this.loginDTO.username = username;
    this.loginDTO.password = password;
  }

  @Mutation
  public SET_TOKEN(authResponse: AuthDTO) {
    this.authToken = authResponse;
    db.set('authToken', authResponse);
  }

  @Action
  public async verifyAuthentication() {
    LoadingBar.start();
    await myAxios
      .post(this.defaultRoute, this.loginDTO)
      .then(res => {
        Notify.create({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'شما با موفقیت وارد حساب کاربری خود شدید'
        });
        this.SET_TOKEN(res.data);
        LoadingBar.stop();
      })
      .catch(error => {
        LoadingBar.stop();
        db.remove('authToken');
        if (error.response.status === 401) {
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'نام کاربری یا رمز عبور خود را اشتباه وارد کرده اید!'
          });
        } else {
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: error.message
          });
        }
      });
  }

  @Action
  public async revokeAuthentication() {
    db.remove('authToken');
  }

  @Action
  public refreshToken() {
    return new Promise((resolve, reject) => {
      myAxios
        .post(this.defaultRoute, {
          client_id: this.loginDTO.client_id,
          client_secret: this.loginDTO.client_secret,
          grant_type: this.loginDTO.grant_type,
          push_client_id: this.loginDTO.push_client_id,
          refresh_token: this.authToken.refresh_token,
          type: this.loginDTO.type
        })
        .then(response => {
          this.SET_TOKEN(response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
