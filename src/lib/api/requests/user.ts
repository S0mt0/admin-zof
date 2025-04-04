import { axiosPrivate } from "../config";
import { otherEndPoints } from "../endpoints";

export const getProfile = async (accessToken: string) => {
  return (
    await axiosPrivate.get<ApiResponse<User>>(otherEndPoints.user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data.data;
};

export const deleteAccount = async (accessToken: string) => {
  return await axiosPrivate.delete<ApiResponse<string>>(otherEndPoints.user, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateProfile = async (
  accessToken: string,
  dto: UpdateUserDto
) => {
  return await axiosPrivate.patch<ApiResponse<User>>(otherEndPoints.user, dto, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
