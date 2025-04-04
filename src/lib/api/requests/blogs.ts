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

export const updateBlog = async (
  accessToken: string,
  blogId: string,
  dto: Partial<BlogStructure>
) => {
  return (
    await axiosPrivate.patch<ApiResponse<TBlog>>(
      `${otherEndPoints.blogs}/${blogId}`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  ).data.data;
};

export const deleteBlog = async (accessToken: string, blogId: string) => {
  return await axiosPrivate.delete<ApiResponse<string>>(
    `${otherEndPoints.blogs}/${blogId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return (
    await axiosPrivate.put<ApiResponse<{ url: string }>>(
      otherEndPoints.upload,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  ).data.data?.url as string;
};

export const createBlog = async (accessToken: string, dto: BlogStructure) => {
  return (
    await axiosPrivate.post<ApiResponse<TBlog>>(otherEndPoints.blogs, dto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data.data;
};
