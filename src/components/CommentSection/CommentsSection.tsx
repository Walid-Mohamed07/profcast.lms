'use client';

import { formatDate } from '@/constants/formatDate';
import { STORAGE_PATH } from '@/constants/storagePath';
import { CourseComments } from '@/models/comments';
import Image from 'next/image';
import './CommentSection.css';

interface Props<T extends CourseComments> {
  data: T;
}

const CommentsSection = <T extends CourseComments>({ data }: Props<T>) => {
  return (
    <div className="comments-container">
      <Image
        src={
          data.user.image_path
            ? STORAGE_PATH + data.user.image_path
            : STORAGE_PATH + 'images/users/unknown.webp'
        }
        alt="Commenter"
        className="comment-image"
        width={100}
        height={100}
        loading="lazy"
      />
      <div className="flex flex-col gap-1">
        <div className="comment-details">
          <div className="comment-header">
            <h4 className="comment-name">{data.user.name}</h4>
          </div>
          <p>{data.content}</p>
        </div>
        <div className="px-4">
          <span className="comment-time">{formatDate(data.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
