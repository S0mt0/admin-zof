import { useState } from "react";

import { BlogEditor } from "./components/blog-editor";
import { PublishForm } from "./components/publish-form";
import { EditorContext } from "@/lib/contexts";
import { initBlogStructure } from "./components";

export const Editor = () => {
  const [blogData, setBlogData] = useState<BlogStructure>(initBlogStructure);

  const [editorState, setEditorState] = useState<EditorState>("editor");
  const [draftState, setDraftState] = useState<boolean>(false);

  return (
    <EditorContext.Provider
      value={{
        blogData,
        setBlogData,
        editorState,
        setEditorState,
        draftState,
        setDraftState,
      }}
    >
      {editorState === "editor" ? <BlogEditor /> : <PublishForm />}
    </EditorContext.Provider>
  );
};
