import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Input from './Input';

interface KeywordInputProps {
  value?: string[];
  placeholder?: string;
  className?: string;
  errorMsg?: string;
  onKeywordsChange: (keywords: string[]) => void;
}

const KeywordInput: FC<KeywordInputProps> = ({
  value = [],
  placeholder,
  className,
  errorMsg,
  onKeywordsChange,
}) => {
  const [keywords, setKeywords] = useState<string[]>(value);

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (value.length > 0) {
      setKeywords(value.includes('') ? [] : value);
    }
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!keywords.includes(inputValue.trim())) {
        const newKeywords = [...keywords, inputValue.trim()];
        setKeywords(newKeywords);
        onKeywordsChange(newKeywords);
      }
      setInputValue('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    const newKeywords = keywords.filter(
      (keyword) => keyword !== keywordToRemove,
    );
    setKeywords(newKeywords);
    onKeywordsChange(newKeywords);
  };

  return (
    <div className="keyword-input-container">
      <motion.div
        animate={{ marginBottom: keywords.length === 0 ? 0 : 8 }}
        className="keywords flex flex-wrap gap-2"
      >
        <AnimatePresence>
          {keywords.map((keyword) => (
            <motion.div
              key={keyword}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
              className="keyword-box bg-blue-500 text-white px-2 py-1 flex items-center rounded"
            >
              <span className="keyword-text mr-2">{keyword}</span>
              <FaTimes
                className="cursor-pointer"
                onClick={() => handleRemoveKeyword(keyword)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Input
        classN={className}
        errorMsg={errorMsg}
        onChange={handleInputChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default KeywordInput;
