import { axiosPrivate } from "../config";
import { authEndpoints } from "../endpoints";

export const signup = async (dto: SignUpDto) => {
  return (
    await axiosPrivate.post<ApiResponse<string>>(authEndpoints.signup, dto)
  ).data;
};

export const login = async (dto: LoginDto) => {
  return await axiosPrivate.post<ApiResponse<User>>(authEndpoints.login, dto);
};

export const forgotPassword = async (dto: Pick<LoginDto, "email">) => {
  return (
    await axiosPrivate.post<ApiResponse>(authEndpoints.forgot_password, dto)
  ).data;
};

export const resendOTP = async () => {
  return (await axiosPrivate.get<ApiResponse>(authEndpoints.resend_otp)).data;
};

export const verifyOTP = async (dto: { rp_code: string }) => {
  return (await axiosPrivate.post<ApiResponse>(authEndpoints.verify_otp, dto))
    .data;
};

export const resetPassword = async (dto: NewPasswordDTO) => {
  return (
    await axiosPrivate.put<ApiResponse>(authEndpoints.reset_password, dto)
  ).data;
};

export const refreshToken = async () => {
  return await axiosPrivate.get<ApiResponse<string>>(authEndpoints.refresh);
};

export const logout = async () => {
  return await axiosPrivate.get(authEndpoints.logout);
};
