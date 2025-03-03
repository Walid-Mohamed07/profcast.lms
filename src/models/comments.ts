export interface CourseComments {
  id: number;
  course_id: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    image_path: string;
  };
}
