import { axiosPrivate } from "../config";
import { authEndpoints } from "../endpoints";

export const signup = async (dto: AuthDto) => {
  return await axiosPrivate.post<ApiResponse>(authEndpoints.signup, dto);
};

export const login = async (dto: AuthDto) => {
  return await axiosPrivate.post<ApiResponse<User>>(authEndpoints.login, dto);
};

export const forgotPassword = async (dto: Pick<AuthDto, "email">) => {
  return await axiosPrivate.post<ApiResponse>(
    authEndpoints.forgot_password,
    dto
  );
};

export const resendPRCode = async () => {
  return await axiosPrivate.get<ApiResponse>(authEndpoints.resend_pr_code);
};

export const verifyPRCode = async (dto: { rp_code: string }) => {
  return await axiosPrivate.post<ApiResponse>(
    authEndpoints.verify_pr_code,
    dto
  );
};

export const resetPassword = async (dto: NewPasswordDTO) => {
  return await axiosPrivate.put<ApiResponse>(authEndpoints.reset_password, dto);
};
