/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { API_BASE_URL } from "@/lib/constants";
import { axiosPrivate } from "../config";
import { otherEndPoints } from "../endpoints";

export async function getAllEvents(query?: Record<string, any>) {
  const url = new URL(`${API_BASE_URL}${otherEndPoints.events}`);

  query = { ...query, fields: "-more_details" };

  Object.keys(query).forEach((key) => {
    if (query[key] !== undefined && query[key] !== null) {
      url.searchParams.append(key, query[key]);
    }
  });

  return (await axios.get<ApiResponse<EventsData>>(url.toString())).data.data;
}

export const getEvent = async (eventId: string) =>
  (
    await axiosPrivate.get<ApiResponse<TEvent>>(
      `${otherEndPoints.events}/${eventId}`
    )
  ).data.data;

export const updateEvent = async (
  accessToken: string,
  eventId: string,
  dto: Partial<EventStructure>
) => {
  return (
    await axiosPrivate.patch<ApiResponse<TEvent>>(
      `${otherEndPoints.events}/${eventId}`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  ).data.data;
};

export const deleteEvent = async (accessToken: string, eventId: string) => {
  return await axiosPrivate.delete<ApiResponse<string>>(
    `${otherEndPoints.events}/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const uploadEventImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return (
    await axiosPrivate.put<ApiResponse<{ url: string }>>(
      otherEndPoints.events_files,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  ).data.data?.url as string;
};

export const createEvent = async (accessToken: string, dto: EventStructure) => {
  return (
    await axiosPrivate.post<ApiResponse<TEvent>>(otherEndPoints.events, dto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data.data;
};
