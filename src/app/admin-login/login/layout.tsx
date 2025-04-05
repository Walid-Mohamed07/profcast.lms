import QueryProvider from '@/components/QueryProvider';
import styles from '@/features/dashboard/DashboardPage.module.css';
import '../../globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <QueryProvider>
          <div className={styles.container}>{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
};

export default Layout;
