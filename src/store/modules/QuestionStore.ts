import { Module, Action } from 'vuex-module-decorators';
import Store from '../index';
import { CategoryProps, CategoryDTO } from '../../types/Category.interface';
import BaseStore from './BaseStore';
import { CATEGORY_TYPE, QuestionProps, QuestionDTO } from '../../types';
import { myAxios } from '../../boot/axios';

@Module({
  dynamic: true,
  name: 'question',
  namespaced: true,
  store: Store
})
export default class QuestionStore extends BaseStore<QuestionProps, QuestionDTO> {
  public defaultRoute: string = '/v1/questions/category';

  public dto: QuestionDTO = {
    name_fa: '',
    category_id: 0,
    rel: []
  };

  @Action
  public async findById(): Promise<void> {
    this.context.commit('SET_LOADING', true);
    this.context.commit('SET_STATUS', 'ONPROGRESS');

    const isRouteHaveParameter = this.defaultRoute.match('\\?');

    let route: string = isRouteHaveParameter?.length
      ? `${this.defaultRoute}&orderBy=id&sortedBy=desc`
      : `${this.defaultRoute}?orderBy=id&sortedBy=desc`;

    await myAxios
      .get(`${route}/1`)
      .then(res => {
        this.context.commit('SET_DATA', res.data.data);
        this.context.commit('SET_LOADING', false);
        this.context.commit('SET_STATUS', 'SUCCESS');
      })
      .catch(error => {
        console.log(error);
        this.context.commit('SET_LOADING', false);
        this.context.commit('SET_STATUS', 'FAILED');
      });
    this.context.commit('SET_STATUS', 'IDLE');
  }
}
