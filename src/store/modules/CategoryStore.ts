import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../index';
import { myAxios } from '../../boot/axios';
import { Notify } from 'quasar';
import { REQUEST_STATUS, AuthDTO } from '../../types';
import { CategoryProps, CategoryDTO } from '../../types/Category.interface';
import BaseStore from './BaseStore';

@Module({
  dynamic: true,
  name: 'category',
  namespaced: true,
  store: Store
})
export default class CategoryStore extends BaseStore<CategoryProps, CategoryDTO> {
  // public model: CategoryProps[] = [];
  public defaultRoute: string = '/v1/topics/category';

  get categories(): CategoryProps[] {
    return this.model;
  }

  // @Action
  // public async getCategories(): Promise<void> {
  //   this.SET_LOADING(true);
  //   this.SET_STATUS('ONPROGRESS');
  //   await myAxios
  //     .get(`${this.defaultRoute}?orderBy=id&sortedBy=desc`)
  //     .then(res => {
  //       this.SET_MODEL(res.data.data);
  //       this.SET_LOADING(false);
  //       this.SET_STATUS('SUCCESS');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.SET_LOADING(false);
  //       this.SET_STATUS('FAILED');
  //     });
  //   this.SET_STATUS('IDLE');
  // }

  // public categories: CategoryProps[] = [];
  // private categoriesRoute: string = '/v1/topics/category';

  // public specialtyDTO: SpecialtyDTO = {
  //   name: '',
  //   img: ''
  // };

  // @Mutation
  // public SET_CATEGORIES(response: CategoryProps[]): void {
  //   this.model = response;
  // }

  // @Mutation
  // public PUSH_SPECIALTY(response: CategoryProps): void {
  //   this.categories.unshift(response);
  // }

  // @Mutation
  // public SET_SPECIALTY_DTO(data: SpecialtyDTO): void {
  //   const { name, img } = data;
  //   this.specialtyDTO.name = name;
  //   this.specialtyDTO.img = img;
  // }

  // @Action
  // public async getCategories(): Promise<void> {
  //   this.SET_LOADING(true);
  //   this.SET_STATUS('ONPROGRESS');
  //   await myAxios
  //     .get(`${this.defaultRoute}?orderBy=id&sortedBy=desc`)
  //     .then(res => {
  //       this.SET_MODEL(res.data.data);
  //       this.SET_LOADING(false);
  //       this.SET_STATUS('SUCCESS');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.SET_LOADING(false);
  //       this.SET_STATUS('FAILED');
  //     });
  //   this.SET_STATUS('IDLE');
  // }

  // @Action
  // public async storeSpecialty(): Promise<void> {
  //   this.SET_STATUS('ONPROGRESS');

  //   let formData = new FormData();
  //   formData.append('img', this.specialtyDTO.img[0]);
  //   formData.append('name', this.specialtyDTO.name);

  //   await myAxios
  //     .post(this.categoriesRoute, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  //     .then(res => {
  //       this.SET_STATUS('SUCCESS');
  //       this.PUSH_SPECIALTY(res.data.data);
  //     })
  //     .catch(error => {
  //       this.SET_STATUS('FAILED');
  //       Notify.create({
  //         color: 'red-4',
  //         textColor: 'white',
  //         icon: 'error',
  //         message: error.message
  //       });
  //     });
  // }
}
