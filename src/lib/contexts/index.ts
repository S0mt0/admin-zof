import { createContext } from "react";

export const BlogEditorContext = createContext<IBlogEditorContext | undefined>(
  undefined
);

export const EventEditorContext = createContext<
  IEventEditorContext | undefined
>(undefined);
