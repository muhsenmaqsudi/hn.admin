import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../index';
import { myAxios } from '../../boot/axios';
import { Notify } from 'quasar';
import { SpecialtyDTO, SpecialtyProps, REQUEST_STATUS } from '../../types';
import BaseStore from './BaseStore';

@Module({
  dynamic: true,
  name: 'specialty',
  namespaced: true,
  store: Store
})
export default class SpecialtyStore extends BaseStore<SpecialtyProps, SpecialtyDTO> {
  public defaultRoute: string = '/v1/specialities';

  public dto: SpecialtyDTO = {
    name: '',
    img: ''
  };

  @Action
  public async create(): Promise<void> {
    this.SET_STATUS('ONPROGRESS');

    let formData = new FormData();
    formData.append('img', this.dto.img[0]);
    formData.append('name', this.dto.name);

    await myAxios
      .post(this.defaultRoute, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        this.SET_STATUS('SUCCESS');
        this.PUSH_DATA(res.data.data);
      })
      .catch(error => {
        this.SET_STATUS('FAILED');
        Notify.create({
          color: 'red-4',
          textColor: 'white',
          icon: 'error',
          message: error.message
        });
      });
  }
}
