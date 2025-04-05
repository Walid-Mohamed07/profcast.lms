'use server';

import { signIn } from '@/app/auth';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CourseSch, UserSch } from './models';
import { connectToDB } from './util';

export const addUser = async (formData) => {
  const { username, email, password, phone, address, role, status } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserSch({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
      status,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to create user!');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, role, status } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      role,
      status,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key],
    );

    await UserSch.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update user!');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const addCourse = async (formData) => {
  const { title, cat, description, instructor, duration, price, status } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newCourse = new CourseSch({
      title,
      cat,
      description,
      instructor,
      duration,
      price,
      status,
    });

    await newCourse.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to create course!');
  }

  revalidatePath('/dashboard/courses');
  redirect('/dashboard/courses');
};

export const updateCourse = async (formData) => {
  const {
    id,
    title,
    category,
    description,
    instructor,
    duration,
    price,
    status,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      category,
      description,
      instructor,
      duration,
      price,
      status,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key],
    );

    await CourseSch.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update course!');
  }

  revalidatePath('/dashboard/courses');
  redirect('/dashboard/courses');
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await UserSch.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete user!');
  }

  revalidatePath('/dashboard/users');
};

export const deleteCourse = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await CourseSch.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete course!');
  }

  revalidatePath('/dashboard/courses');
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { username, password });
  } catch (err) {
    if (err.message.includes('CredentialsSignin')) {
      console.log('err 1');
      return 'Wrong Credentials';
    }
    console.log('err 2');
    throw err;
    return 'Wrong Credentials';
  }
};
