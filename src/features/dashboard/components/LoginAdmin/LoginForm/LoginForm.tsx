'use client';

import { authenticate } from '@/lib/actions';
import Image from 'next/image';
import styles from './LoginForm.module.css';
import { useActionState } from 'react';

const LoginForm = () => {
  const [state, formAction] = useActionState(authenticate, undefined);

  return (
    <div className={styles.container}>
      <Image
        src="/assets/images/logow.webp"
        alt="logo"
        width={200}
        height={50}
        priority
      />
      <form action={formAction} className={styles.form}>
        <h1>Login to Dashboard</h1>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">Login</button>
        {state && <p className={styles.wrongCredintials}>{state}</p>}{' '}
        {/* Display state if available */}
      </form>
    </div>
  );
};

export default LoginForm;
