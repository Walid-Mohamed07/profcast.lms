import { STORAGE_PATH } from '@/constants/storagePath';
import Image from 'next/image';
import styles from './Transactions.module.css';

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.user}>
              <Image
                src={STORAGE_PATH + '/images/users/unknown.webp'}
                alt=""
                width={40}
                height={40}
                className={styles.userImage}
              />
              Ahmed Sobky
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </td>
            <td>14.02.2024</td>
            <td>$9.200</td>
          </tr>
          <tr>
            <td className={styles.user}>
              <Image
                src={STORAGE_PATH + '/images/users/unknown.webp'}
                alt=""
                width={40}
                height={40}
                className={styles.userImage}
              />
              Bassem Khaled
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>14.02.2024</td>
            <td>$1.500</td>
          </tr>
          <tr>
            <td className={styles.user}>
              <Image
                src={STORAGE_PATH + '/images/users/unknown.webp'}
                alt=""
                width={40}
                height={40}
                className={styles.userImage}
              />
              Mohaned El-Deeb
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Cancelled
              </span>
            </td>
            <td>14.02.2024</td>
            <td>$50.400</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
