import BaseProps from './BaseProps.interface';
import { SpecialtyProps } from './Specialty.interface';
import { USER_TYPE, USER_STATE, GENDERS } from './enums';

export interface UserProps extends BaseProps {
  readonly email: string;
  readonly mobile: string;
  readonly profile: {
    data: ProfileProps[];
  };
}

export interface ProfileProps extends BaseProps {
  readonly address: string;
  readonly avatar: string;
  readonly brithdate: string;
  readonly complete_profile: boolean;
  readonly current_consultation_id: number;
  readonly fax: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly license_number: string;
  readonly license_title: string;
  readonly state: string;
  readonly tell: string;
  readonly type: string;
  readonly university: string;
  readonly user_id: number;
  readonly speciality: {
    data: [
      {
        id: number;
        doctor_id: number;
        specialities_id: number;
        specialityDetail: {
          data: SpecialtyProps[];
        };
      }
    ];
  };
}

export interface CreateDoctorDto {
  mobile: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  tell: number | null;
  fax: number | null;
  gender: GENDERS;
  brithdate: Date | null;
  license_title: string | null;
  license_number: string | null;
  university: string;
  gradation_year: string;
  type: USER_TYPE;
  national_code: number | null;
  specialties: number[];
  state: USER_STATE;
}

export interface CreateAuthorDto {
  mobile: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: GENDERS;
  brithdate: Date | null;
  license_title: string | null;
  type: USER_TYPE;
  state: USER_STATE;
}
