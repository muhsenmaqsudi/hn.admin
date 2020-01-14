import { Module } from 'vuex-module-decorators';
import Store from '../index';
import {
  UserProps,
  CreateDoctorDto,
  GENDERS,
  USER_TYPE,
  USER_STATE,
  CreateAuthorDto
} from '../../types';
import BaseStore from './BaseStore';

@Module({
  dynamic: true,
  name: 'doctor',
  namespaced: true,
  store: Store
})
export class DoctorStore extends BaseStore<UserProps, CreateDoctorDto> {
  public defaultRoute: string = '/v1/users?search=profiles.type:doctor';
  public postRoute: string = '/v1/register-doctor';

  public dto: CreateDoctorDto = {
    mobile: '+98',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    tell: null,
    fax: null,
    gender: GENDERS.MALE,
    brithdate: null,
    license_title: null,
    license_number: null,
    university: '',
    gradation_year: '',
    type: USER_TYPE.DOCTOR,
    national_code: null,
    specialties: [],
    state: USER_STATE.ACTIVE
  };
}

@Module({
  dynamic: true,
  name: 'author',
  namespaced: true,
  store: Store
})
export class AuthorStore extends BaseStore<UserProps, CreateAuthorDto> {
  public defaultRoute: string = '/v1/users?search=profiles.type:author';
  public postRoute: string = '/v1/register-author';

  public dto: CreateAuthorDto = {
    mobile: '+98',
    email: '',
    firstName: '',
    lastName: '',
    gender: GENDERS.MALE,
    brithdate: null,
    license_title: '',
    type: USER_TYPE.AUTHOR,
    state: USER_STATE.ACTIVE
  };
}
