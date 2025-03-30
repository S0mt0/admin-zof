import { userEndPoints } from "../../api/endpoints";
import { useAxiosPrivate } from "../use-axios-private";

export const useUserRequests = () => {
  const axios = useAxiosPrivate();

  const getProfile = async () => {
    return (await axios.get<ApiResponse<User>>(userEndPoints.profile)).data
      .data;
  };

  const deleteAccount = async () => {
    return await axios.delete<ApiResponse<string>>(
      userEndPoints.delete_account
    );
  };

  const updateProfile = async (dto: UpdateUserDto) => {
    return await axios.patch<ApiResponse<User>>(
      userEndPoints.update_profile,
      dto
    );
  };

  return {
    getProfile,
    deleteAccount,
    updateProfile,
  };
};
