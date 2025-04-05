import Image from 'next/image';
import { MdPlayCircleFilled, MdReadMore } from 'react-icons/md';
import styles from './RightBar.module.css';

const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image
            src="/assets/images/react.png"
            alt=""
            fill
            className={styles.bg}
          />
        </div>
        <div className={styles.texts}>
          <span className={styles.notification}>Available Now!</span>
          <h3 className={styles.title}>
            How to use the new version of the admin dashboard
          </h3>
          <span className={styles.subTitle}>Takes 4 minits to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            eius sed sunt aspernatur numquam odit maxime quidem, eaque accusamus
            unde culpa, molestias architecto dolorum ipsam libero perferendis
            dolores commodi corporis.
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image
            src="/assets/images/react.png"
            alt=""
            fill
            className={styles.bg}
          />
        </div>
        <div className={styles.texts}>
          <span className={styles.notification}>Coming Soon...</span>
          <h3 className={styles.title}>
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className={styles.subTitle}>Boost your productivity</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi optio
            doloribus maxime consequatur alias facilis a, impedit, harum minus
            quas laboriosam fuga ducimus necessitatibus illum, nostrum quam
            dicta amet! Necessitatibus.
          </p>
          <button className={styles.button}>
            <MdReadMore />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
