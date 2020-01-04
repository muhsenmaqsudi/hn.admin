import { Module } from 'vuex-module-decorators';
import Store from '../index';
import { UserProps } from '../../types';
import BaseStore from './BaseStore';

@Module({
  dynamic: true,
  name: 'doctor',
  namespaced: true,
  store: Store
})
export class DoctorStore extends BaseStore<UserProps, {}> {
  public defaultRoute: string = '/v1/users?search=profiles.type:doctor';
}

@Module({
  dynamic: true,
  name: 'author',
  namespaced: true,
  store: Store
})
export class AuthorStore extends BaseStore<UserProps, {}> {
  public defaultRoute: string = '/v1/users?search=profiles.type:author';
}
