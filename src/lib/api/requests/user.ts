import { axiosPrivate } from "../config";
import { userEndPoints } from "../endpoints";

export const getProfile = async (accessToken: string) => {
  return (
    await axiosPrivate.get<ApiResponse<User>>(userEndPoints.profile, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data.data;
};

export const deleteAccount = async (accessToken: string) => {
  return await axiosPrivate.delete<ApiResponse<string>>(
    userEndPoints.delete_account,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const updateProfile = async (
  accessToken: string,
  dto: UpdateUserDto
) => {
  return await axiosPrivate.patch<ApiResponse<User>>(
    userEndPoints.update_profile,
    dto,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
