import { axiosPrivate } from "../config";
import { userEndPoints } from "../endpoints";

export const getProfile = async () => {
  return (await axiosPrivate.get<ApiResponse<User>>(userEndPoints.profile))
    .data;
};

export const deleteAccount = async () => {
  return await axiosPrivate.delete<ApiResponse<string>>(
    userEndPoints.delete_account
  );
};

export const updateProfile = async (dto: UpdateUserDto) => {
  return await axiosPrivate.patch<ApiResponse<User>>(
    userEndPoints.update_profile,
    dto
  );
};
