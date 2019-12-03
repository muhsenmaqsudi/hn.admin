import ProfileProps from './ProfileProps.interface';
import BaseProps from './BaseProps.interface';

export default interface UserProps extends BaseProps {
  readonly email: string;
  readonly mobile: string;
  readonly profile: {
    data: ProfileProps[];
  };
}
