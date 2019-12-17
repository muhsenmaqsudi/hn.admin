import BaseProps from './BaseProps.interface';

export interface TopicProps extends BaseProps {
  readonly topics_categories_id: number;
  readonly title: string;
  readonly publish_at: boolean;
  readonly status: string;
  readonly views: number;
  readonly age_id: string | null;
  readonly body: string;
  readonly tags: string[];
  readonly gender: 'male' | 'female';
  readonly liked: boolean;
  readonly likes: number;
}
