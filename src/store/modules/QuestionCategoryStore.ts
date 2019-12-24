import { Module } from 'vuex-module-decorators';
import Store from '../index';
import BaseStore from './BaseStore';
import { QuestionCategoryProps, QuestionCategoryDTO } from '../../types';

@Module({
  dynamic: true,
  name: 'question-category',
  namespaced: true,
  store: Store
})
export default class QuestionCategory extends BaseStore<
  QuestionCategoryProps,
  QuestionCategoryDTO
> {
  public defaultRoute: string = '/v1/questions/category';

  public dto: QuestionCategoryDTO = {
    title: ''
  };
}
