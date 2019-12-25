import BaseProps from './BaseProps.interface';
import { FAMILY_RELATIONS } from './enums';

export interface QuestionCategoryProps extends BaseProps {
  readonly title: string;
  readonly questions: {
    data: QuestionProps[];
  };
}

export interface QuestionCategoryDTO {
  title: string;
}

export interface QuestionProps extends BaseProps {
  readonly name_fa: string;
  readonly name_en: string;
  readonly category_id: number;
  readonly rel: number[];
}

export interface QuestionDTO {
  name_fa: string;
  category_id: string | number;
  rel: FAMILY_RELATIONS[];
}
