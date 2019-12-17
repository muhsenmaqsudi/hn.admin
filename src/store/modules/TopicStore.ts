import { Module, VuexModule } from 'vuex-module-decorators';
import Store from '../index';
import BaseStore from './BaseStore';
import { TopicProps } from '../../types';

@Module({
  dynamic: true,
  name: 'topic',
  namespaced: true,
  store: Store
})
export default class TopicStore extends BaseStore<TopicProps, {}> {
  public defaultRoute: string = '/v1/topics?include=author,topicCategory';
}
