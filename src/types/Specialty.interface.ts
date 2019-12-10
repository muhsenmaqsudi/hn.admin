import BaseProps from './BaseProps.interface';

export interface SpecialtyProps extends BaseProps {
  readonly name: string;
  readonly sum_consultation: number;
  readonly img: string | null;
}

export interface SpecialtyDTO {
  name: string;
  img: FileList | string;
}
