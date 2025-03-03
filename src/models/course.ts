import { Category } from './category';
import { CourseComments } from './comments';
import { Instructor } from './instructor';
import { Media } from './media';

export interface Course {
  id: number;
  instructor_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  rating: number;
  slug: string;
  objectives: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  instructor: Instructor;
  category: Category;
  media: Media[];
  comments: CourseComments[];
}

export interface RateCoursePayload {
  rating: number;
  comment: string;
  course_id: number;
}
