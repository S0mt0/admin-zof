import { useContext } from "react";

import { EditorContext } from "../contexts";

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within a EditorProvider");
  }
  return context;
};
