import { otherEndPoints } from "../../api/endpoints";
import { useAxiosPrivate } from "../use-axios-private";

export const useBlogsRequests = () => {
  const axios = useAxiosPrivate();

  const getProfile = async () => {
    return (await axios.get<ApiResponse<TBlog>>(otherEndPoints.blogs)).data
      .data;
  };

  const deleteAccount = async () => {
    return await axios.delete<ApiResponse<string>>(otherEndPoints.blogs);
  };

  return {
    getProfile,
    deleteAccount,
  };
};
