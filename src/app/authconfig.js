export const authConfig = {
  providers: [],
  pages: {
    signIn: '/admin-login/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) {
          console.log('User is logged in and on the dashboard.');
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        console.log('User is logged in but not on the dashboard.');
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }
      return true;
    },
    // redirect() {
    //   return "/dashboard";
    // },
  },
};
