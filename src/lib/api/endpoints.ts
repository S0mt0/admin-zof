export const authEndpoints = {
  /** `POST` : Sign up route*/
  signup: "/auth/sign-up",

  /** `POST` : Login route*/
  login: "/auth/sign-in",

  /** `POST` : Forgot password route*/
  forgot_password: "/auth/forgot-password",

  /** `PUT` : Reset password route*/
  reset_password: "/auth/reset-password",

  /** `POST` : Verify reset password code route*/
  verify_otp: "/auth/verify-pr-code",

  /** `GET` : Resend reset password code route*/
  resend_otp: "/auth/resend-pr-code",

  /** `GET` : Logout route */
  logout: "/auth/logout",

  /** `GET` : Refresh token route */
  refresh: "/auth/refresh-token",
};

export const otherEndPoints = {
  blogs: "/blogs",
  /** `PUT` and `DELETE` */
  blogs_files: "/blogs/upload-img",
  events_files: "/events/upload-img",
  events: "/events",
  team: "/team",
  /** `PATCH`, `GET` and `DELETE` */
  user: "/users/me",
};
