import BaseProps from './BaseProps.interface';
import { CATEGORY_TYPE } from './enums';

export interface CategoryProps extends BaseProps {
  readonly title: string;
  readonly type: CATEGORY_TYPE;
  readonly image: FileList | string;
}

export interface CategoryDTO {
  title: string;
  type: CATEGORY_TYPE;
  profile_id: number;
}
