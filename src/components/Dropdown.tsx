'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { RefObject, useEffect, useRef, useState } from 'react';

interface Props<T> {
  value?: T;
  items: T[];
  onSelect: (item: T) => void;
  errorMsg?: string;
  width?: string;
  placeholder?: string;
  labelKey?: keyof T;
  padding?: string;
}

const Dropdown = <T extends string | object>({
  value,
  items,
  errorMsg,
  width,
  placeholder,
  labelKey,
  padding,
  onSelect,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(value || null);

  useEffect(() => {
    if (value) {
      setSelectedItem(value);
    }
  }, [value]);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref as RefObject<HTMLElement>, () => setIsOpen(false));

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  const getDisplayValue = (item: T | null): string => {
    if (!item) return placeholder || '';
    if (typeof item === 'string') return item;
    if (labelKey && typeof item === 'object') return item[labelKey] as string;
    return JSON.stringify(item);
  };

  const isItemSelected = (item: T) => {
    if (!selectedItem) return false;
    if (typeof item === 'string' && typeof selectedItem === 'string') {
      return item === selectedItem;
    }
    if (
      typeof item === 'object' &&
      typeof selectedItem === 'object' &&
      labelKey
    ) {
      return item[labelKey] === selectedItem[labelKey];
    }
    return JSON.stringify(item) === JSON.stringify(selectedItem);
  };

  return (
    <>
      <div
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        style={{ width, padding }}
        className={`relative flex-between w-full border-radius-4 bg-white p-4 border border-[#ccc] ${
          errorMsg ? 'border-red-500' : ''
        } cursor-pointer duration-500`}
      >
        <p
          className={`${
            selectedItem ? '!text-black' : '!text-[#808080]'
          } !mb-0`}
        >
          {getDisplayValue(selectedItem)}
        </p>
        <motion.img
          animate={{ rotate: isOpen ? 180 : 0 }}
          src="/assets/icons/arrowDown.svg"
          alt="Arrow Down"
        />
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full max-h-48 z-50 overflow-auto left-0 top-10 mt-1 bg-white border border-[#ccc] border-radius-4 shadow-lg"
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={`p-2 hover:bg-gray-100 cursor-pointer !m-0 ${
                    isItemSelected(item) ? 'bg-blue-100 font-semibold' : ''
                  }`}
                >
                  {getDisplayValue(item)}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
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

export default Dropdown;
