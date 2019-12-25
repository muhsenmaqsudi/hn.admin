import { Module, Mutation } from 'vuex-module-decorators';
import Store from '../index';
import BaseStore from './BaseStore';
import { QuestionCategoryProps, QuestionCategoryDTO, QuestionProps } from '../../types';

@Module({
  dynamic: true,
  name: 'question',
  namespaced: true,
  store: Store
})
export default class QuestionStore extends BaseStore<QuestionCategoryProps, QuestionCategoryDTO> {
  public defaultRoute: string = '/v1/questions/category';

  public dto: QuestionCategoryDTO = {
    title: ''
  };

  @Mutation
  public PUSH_NEW_QUESTION_TO_DATA(newQuestion: QuestionProps) {
    const modifiedQuestionCategoryIndex: number = this.data.findIndex(
      row => row.id === newQuestion.category_id
    );
    if (modifiedQuestionCategoryIndex !== -1) {
      this.data[modifiedQuestionCategoryIndex].questions.data.push(newQuestion);
    }
  }
}
