export interface ContentCreator {
  id: number;
  name: string;
  image_path?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  about: string;
  image_path: string;
  city: string;
  zip_code: string;
  location_id: number;
  address_line: string;
  user_type: string;
  slug: string;
  website: string;
  location: string;
  portfolio_link: string;
  resume_path: string;
  job_title: string;
}

export interface GetUserResponse {
  user: User;
  stats: Status;
}

export interface Status {
  number_of_posted_posts: number;
  number_of_posted_reports: number;
}

export interface FindEmployeesResponse {
  current_page: number;
  last_page: number;
  next_page_url: string;
  per_page: number;
  prev_page_url: string;
  total: number;
  seekers: {
    data: User[];
  };
}

export interface UploadResumePayload {
  resume_path: File;
}

export interface UpdateUserPayload {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  about?: string;
  city?: string;
  zip_code?: string;
  location?: string;
  address_line?: string;
  portfolio_link?: string;
  jobTitle?: string;
  website?: string;
}
