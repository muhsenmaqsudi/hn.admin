import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../index';
import { myAxios } from '../../boot/axios';
import { Notify } from 'quasar';
import { SpecialtyDTO, SpecialtyProps, REQUEST_STATUS } from '../../types';

@Module({
  dynamic: true,
  name: 'specialty',
  namespaced: true,
  store: Store
})
export default class SpecialtyStore extends VuexModule {
  public specialties: SpecialtyProps[] = [];
  public loading: boolean = false;
  public status: keyof typeof REQUEST_STATUS = 'IDLE';
  private specialtiesRoute: string = '/v1/specialities';

  public specialtyDTO: SpecialtyDTO = {
    name: '',
    img: ''
  };

  @Mutation
  public SET_SPECIALTIES(response: SpecialtyProps[]): void {
    this.specialties = response;
  }

  @Mutation
  public PUSH_SPECIALTY(response: SpecialtyProps): void {
    this.specialties.unshift(response);
  }

  @Mutation
  public SET_LOADING(status: boolean): void {
    this.loading = status;
  }

  @Mutation
  public SET_STATUS(status: keyof typeof REQUEST_STATUS): void {
    this.status = status;
  }

  @Mutation
  public SET_SPECIALTY_DTO(data: SpecialtyDTO): void {
    const { name, img } = data;
    this.specialtyDTO.name = name;
    this.specialtyDTO.img = img;
  }

  @Action
  public async getSpecialties(): Promise<void> {
    this.SET_LOADING(true);
    this.SET_STATUS('ONPROGRESS');
    await myAxios
      .get(`${this.specialtiesRoute}?orderBy=id&sortedBy=desc`)
      .then(res => {
        this.SET_SPECIALTIES(res.data.data);
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

  @Action
  public async storeSpecialty(): Promise<void> {
    this.SET_STATUS('ONPROGRESS');

    let formData = new FormData();
    formData.append('img', this.specialtyDTO.img[0]);
    formData.append('name', this.specialtyDTO.name);

    await myAxios
      .post(this.specialtiesRoute, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        this.SET_STATUS('SUCCESS');
        this.PUSH_SPECIALTY(res.data.data);
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
