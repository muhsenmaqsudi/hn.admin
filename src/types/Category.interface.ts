import BaseProps from './BaseProps.interface';
import { CATEGORY_TYPE } from './enums';

export interface CategoryProps extends BaseProps {
  readonly title: string;
  readonly type: keyof typeof CATEGORY_TYPE;
  readonly image: FileList | string;
}

export interface CategoryDTO {
  title: string;
  type: keyof typeof CATEGORY_TYPE;
}

// export declare type Test = {
//   readonly test: string;
// };
