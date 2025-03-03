import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Input.css';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string | undefined;
  name?: string;
  classN?: string;
  errorMsg?: string;
  placeholder?: string;
  icon?: ReactNode;
  type?: 'text' | 'email' | 'password';
  padding?: string;
  fontSize?: string;
  height?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({
  onChange,
  onBlur,
  value,
  name,
  classN,
  errorMsg,
  placeholder,
  icon,
  type = 'text',
  padding,
  fontSize,
  height,
  onKeyDown,
}) => {
  return (
    <>
      <div
        style={{ padding, height }}
        className={`input-group w-full bg-white border ${errorMsg ? 'border-red-500' : ''} duration-500`}
      >
        {type === 'email' && (
          <>
            <input
              onKeyDown={onKeyDown}
              style={{ fontSize }}
              value={value}
              className={classN}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              type="email"
              placeholder={placeholder}
            />
            <FaEnvelope className="icon" />
          </>
        )}
        {type === 'password' && (
          <>
            <input
              onKeyDown={onKeyDown}
              style={{ fontSize }}
              value={value}
              className={classN}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              type="password"
              placeholder={placeholder}
            />
            <FaLock className="icon" />
          </>
        )}
        {type === 'text' && (
          <>
            <input
              onKeyDown={onKeyDown}
              style={{ fontSize }}
              value={value}
              className={classN}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              type="text"
              placeholder={placeholder}
            />
            {icon}
          </>
        )}
      </div>
      <AnimatePresence>
        {errorMsg && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="!text-start !text-xs !m-0 !text-red-500 !h-0"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
};
export default Input;
