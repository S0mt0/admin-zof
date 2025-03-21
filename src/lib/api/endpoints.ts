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
  verify_pr_code: "/auth/verify-pr-code",

  /** `GET` : Resend reset password code route*/
  resend_pr_code: "/auth/resend-pr-code",

  /** `GET` : Logout route */
  logout: "/auth/logout",

  /** `GET` : Refresh token route */
  refresh: "/auth/refresh-token",
};

export const userEndPoints = {
  /** `GET` : Profile lookup route */
  profile: "/users/me",

  /** `DELETE` */
  delete_account: "/users/me",

  /** `PATCH` : Profile update route */
  update_profile: "/users/me",
};

export const otherEndPoints = {
  blogs: "/blogs",
  events: "/events",
  team: "/team",
};
