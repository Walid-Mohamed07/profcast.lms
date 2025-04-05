import Card from './components/Card/Card';
import Chart from './components/Chart/Chart';
import RightBar from './components/RightBar/RightBar';
import Transactions from './components/Transactions/Transactions';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <RightBar />
      </div>
    </div>
  );
};

export default DashboardPage;
