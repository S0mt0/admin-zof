/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { API_BASE_URL } from "@/lib/constants";
import { axiosPrivate } from "../config";
import { otherEndPoints } from "../endpoints";

export async function getAllBlogs(query?: Record<string, any>) {
  const url = new URL(`${API_BASE_URL}${otherEndPoints.blogs}`);

  query = { ...query, fields: "-content" };

  Object.keys(query).forEach((key) => {
    if (query[key] !== undefined && query[key] !== null) {
      url.searchParams.append(key, query[key]);
    }
  });

  return (await axios.get<ApiResponse<BlogsData>>(url.toString())).data.data;
}

export const getBlog = async (blogId: string) =>
  (
    await axiosPrivate.get<ApiResponse<TBlog>>(
      `${otherEndPoints.blogs}/${blogId}`
    )
  ).data.data;
