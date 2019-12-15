import { Module } from 'vuex-module-decorators';
import Store from '../index';
import { CategoryProps, CategoryDTO } from '../../types/Category.interface';
import BaseStore from './BaseStore';
import { CATEGORY_TYPE } from '../../types';

@Module({
  dynamic: true,
  name: 'category',
  namespaced: true,
  store: Store
})
export default class CategoryStore extends BaseStore<CategoryProps, CategoryDTO> {
  public defaultRoute: string = '/v1/topics/category';

  public dto: CategoryDTO = {
    title: '',
    type: CATEGORY_TYPE.BOOK,
    profile_id: 9
  };
}
