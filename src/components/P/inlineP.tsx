import React from 'react';
import './inlineP.css';

// Define a type for the props
interface PProps {
  idKey?: string; // Optional string
  classN?: string; // Optional string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any; // Required string
}

const P: React.FC<PProps> = ({ idKey, classN, value }) => {
  return (
    <p id={idKey} className={classN}>
      {value}
    </p>
  );
};

export default P;
