import BaseProps from './BaseProps.interface';

export default interface ProfileProps extends BaseProps {
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
}
