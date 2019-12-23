import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../index';
import { myAxios } from '../../boot/axios';
import { UserProps, REQUEST_STATUS } from '../../types';
import BaseStore from './BaseStore';

@Module({
  dynamic: true,
  name: 'user',
  namespaced: true,
  store: Store
})
export default class UserStore extends BaseStore<UserProps, {}> {
  public defaultRoute: string = '/v1/users';
}
