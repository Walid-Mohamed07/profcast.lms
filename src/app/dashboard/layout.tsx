import QueryProvider from '@/components/QueryProvider';
import Navbar from '@/features/dashboard/components/Navbar/Navbar';
import Sidebar from '@/features/dashboard/components/Sidebar/Sidebar';
import styles from '@/features/dashboard/Dashboard.module.css';
import '../globals.css';
import './Dashboard.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <QueryProvider>
          <div className={styles.container}>
            <div className={styles.menu}>
              <Sidebar />
            </div>
            <div className={styles.content}>
              <Navbar />
              {children}
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
};

export default Layout;
