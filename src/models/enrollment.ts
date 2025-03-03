export interface Enrollment {
  id: number;
  course_id: number;
  user_id: number;
  is_started: number;
  is_completed: number;
  completed_at: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}
