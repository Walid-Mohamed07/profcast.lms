import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FC, useState } from 'react';
import './ImagePicker.css';

interface ImagePickerProps {
  value?: string;
  onFileSelect: (file: File) => void;
  label: string;
  errorMsg?: string;
}

const ImagePicker: FC<ImagePickerProps> = ({
  value,
  onFileSelect,
  label,
  errorMsg,
}) => {
  const [imgName, setImgName] = useState<string>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileSelect(file);
      setImgName(file.name);
    }
  };

  return (
    <>
      <input
        type="file"
        id="cvUpload"
        accept=".jpg,.png,.jpeg,.webp"
        onChange={handleFileChange}
      />
      <label htmlFor="cvUpload" id="cvUploadBTN">
        {imgName || value || label}
      </label>
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

export default ImagePicker;
