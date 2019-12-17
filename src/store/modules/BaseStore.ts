import { VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { REQUEST_STATUS } from '../../types';
import { myAxios } from '../../boot/axios';
import { Notify } from 'quasar';

class BaseStore<T, K> extends VuexModule {
  public data: T[] = [];
  public dto: K;
  public loading: boolean = false;
  public status: keyof typeof REQUEST_STATUS = 'IDLE';
  public defaultRoute: string = '';

  @Mutation
  public SET_LOADING(status: boolean): void {
    this.loading = status;
  }

  @Mutation
  public SET_STATUS(status: keyof typeof REQUEST_STATUS): void {
    this.status = status;
  }

  @Mutation
  public SET_DATA(response: T[]): void {
    this.data = response;
  }

  @Mutation
  public PUSH_DATA(response: T): void {
    this.data.unshift(response);
  }

  @Mutation
  public SET_DTO(data: K): void {
    this.dto = data;
  }

  @Action
  public async getAll(): Promise<void> {
    this.context.commit('SET_LOADING', true);
    this.context.commit('SET_STATUS', 'ONPROGRESS');

    const isRouteHaveParameter = this.defaultRoute.match('\\?');

    let route: string = isRouteHaveParameter?.length
      ? `${this.defaultRoute}&orderBy=id&sortedBy=desc`
      : `${this.defaultRoute}?orderBy=id&sortedBy=desc`;

    await myAxios
      .get(route)
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

  @Action
  public async create(): Promise<void> {
    this.context.commit('SET_STATUS', 'ONPROGRESS');
    await myAxios
      .post(this.defaultRoute, this.dto)
      .then(res => {
        this.context.commit('SET_STATUS', 'SUCCESS');
        this.context.commit('PUSH_DATA', res.data.data);
      })
      .catch(error => {
        this.context.commit('SET_STATUS', 'FAILED');
        Notify.create({
          color: 'red-4',
          textColor: 'white',
          icon: 'error',
          message: error.message
        });
      });
  }
}

export default BaseStore;
