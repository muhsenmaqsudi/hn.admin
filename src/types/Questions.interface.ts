import BaseProps from './BaseProps.interface';
import { FAMILY_RELATIONS } from './enums';

export interface QuestionCategoryProps extends BaseProps {
  readonly title: string;
}

export interface QuestionCategoryDTO {
  title: string;
}

export interface QuestionProps extends BaseProps {
  readonly name_fa: string;
  readonly name_en: string;
  readonly rel: number[];
}

export interface QuestionDTO {
  name_fa: string;
  category_id: number;
  rel: FAMILY_RELATIONS[];
}
