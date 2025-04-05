import { useContext } from "react";

import { BlogEditorContext, EventEditorContext } from "../contexts";

export const useBlogEditorContext = () => {
  const context = useContext(BlogEditorContext);
  if (!context) {
    throw new Error(
      "useBlogEditorContext must be used within a EditorProvider"
    );
  }
  return context;
};

export const useEventEditorContext = () => {
  const context = useContext(EventEditorContext);
  if (!context) {
    throw new Error(
      "useEventEditorContext must be used within a EditorProvider"
    );
  }
  return context;
};
