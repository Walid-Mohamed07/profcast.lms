'use client';

import Button from '@/components/Button/Button';
import ImagePicker from '@/components/ImagePicker';
import Loader from '@/components/Loader';
import { MotionDiv } from '@/components/MotionDiv';
import ErrorToast from '@/components/Toast/ErrorToast';
import { IconPath } from '@/constants/iconPath';
import { ImagePath } from '@/constants/imagePath';
import { QueryKey } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { getCourseById } from '../../services/courses';
import './PurchaseComponent.css';

interface PurchaseProps {
  id: string | undefined;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const PurchaseComponent: React.FC<PurchaseProps> = ({ id }) => {
  const courseId = id as string;
  //   const t = useTranslations();
  const {
    data: course,
    isLoading: isCourseLoading,
    error: courseError,
  } = useQuery({
    queryKey: [QueryKey.COURSES, courseId],
    queryFn: () => getCourseById(courseId),
  });

  const imageUrl =
    course?.media[0]?.original_url || ImagePath.COURSE_PLACEHOLDER;

  useEffect(() => {
    const user = getCookie('user') as string;
    if (user) {
      // setInitialValues(JSON.parse(user));
      // console.log(JSON.parse(user));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      totalCost: course?.price || '',
      image: null,
    },
    enableReinitialize: true, // This allows the form to reinitialize when initialValues change
    validationSchema: Yup.object({
      totalCost: Yup.string().required('Error occurred'),
      image: Yup.mixed().required('Image is required'),
    }),
    onSubmit: async (values) => {
      console.log('Form values:', values);
      // try {
      //   const response = await axios.post('/api/buy', values);
      //   console.log('Buy request has been sent successful:', response.data);
      // } catch (error) {
      //   console.error('Error submitting buy request:', error);
      // }
    },
  });

  return (
    <>
      <ErrorToast errorMsg={courseError as unknown as string} />
      <Loader isLoading={isCourseLoading} color="#0a1535">
        <MotionDiv
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 2 * 0.25,
            ease: 'easeInOut',
            duration: 0.5,
          }}
          viewport={{ amount: 0 }}
          className="rounded relative w-full"
        >
          <div className="self-center justify-self-center container-fluid">
            <h2 className="sectionHeader">Course info</h2>
            <div className="flex flex-col md:flex-row contentSectionWrapper px-4 py-7 md:px-5 justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="rounded-md overflow-hidden w-full md:w-28">
                  <Image
                    src={imageUrl}
                    alt="Course Image"
                    width="450"
                    height="450"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-xl md:text-lg">{course?.name}</p>
                  <span className="text-lg md:text-base">
                    {course?.category.name}
                  </span>
                </div>
              </div>
              <div className="place-content-center font-medium text-xl md:text-lg">
                E£{course?.price}
              </div>
            </div>

            <h2 className="sectionHeader">Payment info</h2>
            <div className="flex flex-row contentSectionWrapper px-4 py-7 md:px-5 justify-between">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-5 w-full"
              >
                <div className="flex flex-col">
                  <label htmlFor="address">Payment Attachment</label>
                  <ImagePicker
                    label="Upload Image"
                    onFileSelect={(file) => formik.setFieldValue('image', file)}
                  />
                  {formik.touched.image && formik.errors.image ? (
                    <div className="text-red-600 font-bold">
                      {formik.errors.image}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-row items-end gap-2 italic">
                  <label htmlFor="totalCost">Total Cost:</label>
                  <span className="font-bold text-green-600">{`E£ ${formik.values.totalCost}`}</span>
                  {formik.touched.totalCost && formik.errors.totalCost ? (
                    <div className="text-red-600 font-bold">
                      {formik.errors.totalCost}
                    </div>
                  ) : null}
                </div>

                <Button classN="registerBTN self-center" type="submit">
                  Buy course
                </Button>
              </form>
            </div>

            <h2 className="sectionHeader">Payment methods</h2>
            <div className="flex flex-col contentSectionWrapper px-4 py-7 md:px-5 justify-between gap-5">
              <div className="flex gap-3 items-center">
                <Image
                  src={IconPath.VODAFONE}
                  alt="Vodafone"
                  width={26}
                  height={26}
                />
                <span>+20 123456789</span>
              </div>
              <div className="flex gap-3">
                <Image
                  src={IconPath.INSTAPAY}
                  alt="Instapay"
                  width={26}
                  height={26}
                />
                <span>example@example.com</span>
              </div>
            </div>
          </div>
        </MotionDiv>
      </Loader>
    </>
  );
};

export default PurchaseComponent;
