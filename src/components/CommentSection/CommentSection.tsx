import { useTranslations } from 'next-intl';
import { ChangeEvent, FC, useState } from 'react';
// import { getCurrentUser } from '../../../utils/cookieHelpers';
import Button from '../Button/Button';
import Input from '../Input/Input';
import InfoToast from '../Toast/InfoToast';
import './CommentSection.css';

interface Props {
  onAddComment: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  comment: string;
  isLoading: boolean;
}

const CommentSection: FC<Props> = ({
  onAddComment,
  onChange,
  comment,
  isLoading,
}) => {
  const t = useTranslations();
  // const user = getCurrentUser();

  const [message, setMessage] = useState<string>('');

  return (
    <div className="comment-container">
      <InfoToast infoMsg={message} onMessageClose={() => setMessage('')} />
      <Input
        placeholder={t('blogs.add_comment')}
        value={comment}
        onChange={onChange}
      />
      <Button
        isLoading={isLoading}
        onClick={() =>
          // user
          false
            ? onAddComment()
            : setMessage('You must be logged in to post a comment')
        }
        disabled={Boolean(!comment)}
        classN="BTN2"
      >
        {t('blogs.post_comment')}
      </Button>
    </div>
  );
};

export default CommentSection;
