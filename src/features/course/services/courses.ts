import { api } from '@/lib/axios';
import { BaseResponse, ErrorMessage } from '@/models/api';
import { Course, RateCoursePayload } from '@/models/course';
import { Enrollment } from '@/models/enrollment';

export const getCourses = async (search?: string, page?: string) => {
  try {
    const { data } = await api.get<BaseResponse<Course[]>>('/api/courses', {
      params: { search, page },
    });
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseById = async (id: string) => {
  try {
    const { data } = await api.get<Course>(`/api/courses/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

export const getEnrolledCourses = async () => {
  try {
    const { data } = await api.post<{ enrollments: Enrollment[] }>(
      '/api/courses/enrollment',
      {},
    );
    return data?.enrollments;
  } catch (error) {
    console.error('Error fetching enrolled course:', error);
    throw error;
  }
};

export const rateCourse = async (body: RateCoursePayload) => {
  try {
    await api.post<RateCoursePayload>('/api/courses/rate', body);
  } catch (error) {
    console.error('Error:', error);
    throw (error as ErrorMessage).response.data.error;
  }
};
