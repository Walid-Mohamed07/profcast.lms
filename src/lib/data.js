import { CourseSch, UserSch } from '@/lib/models.js';
import { connectToDB } from './util.js';

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, 'i');
  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await UserSch.countDocuments({ username: { $regex: regex } });
    const users = await UserSch.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();
    return { count, users };
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await UserSch.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch user!');
  }
};

export const fetchCourses = async (q, page) => {
  const regex = new RegExp(q, 'i');

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await CourseSch.countDocuments({ title: { $regex: regex } });
    const courses = await CourseSch.find({ title: { $regex: regex } })
      .populate('instructor')
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();
    return { count, courses };
  } catch (error) {
    throw new Error('Error fetching courses: ' + error.message);
  }
};

export const fetchCourse = async (id) => {
  try {
    connectToDB();
    const course = await CourseSch.findById(id);
    return course;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch course!');
  }
};
