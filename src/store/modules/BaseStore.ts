import { VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { REQUEST_STATUS } from '../../types';
import { myAxios } from '../../boot/axios';

class BaseStore<T, U> extends VuexModule {
  public model: T[];
  public dto: U;
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
  SET_MODEL(response: T[]): void {
    this.model = response;
  }

  @Action
  public async getCategories(): Promise<void> {
    this.SET_LOADING(true);
    this.SET_STATUS('ONPROGRESS');
    await myAxios
      .get(`${this.defaultRoute}?orderBy=id&sortedBy=desc`)
      .then(res => {
        this.SET_MODEL(res.data.data);
        this.SET_LOADING(false);
        this.SET_STATUS('SUCCESS');
      })
      .catch(error => {
        console.log(error);
        this.SET_LOADING(false);
        this.SET_STATUS('FAILED');
      });
    this.SET_STATUS('IDLE');
  }
}

// export interface IBaseStore<T> {
//   defaultRoute: string;
// }

export default BaseStore;
