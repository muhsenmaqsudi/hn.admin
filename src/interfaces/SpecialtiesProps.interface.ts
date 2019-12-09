import BaseProps from './BaseProps.interface';

export default interface SpecialtiesProps extends BaseProps {
  readonly name: string;
  readonly sum_consultation: number;
  readonly img: string | null;
}
