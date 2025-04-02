import { useState } from "react";

import { BlogEditor } from "./components/blog-editor";
import { PublishForm } from "./components/publish-form";
import { EditorContext } from "@/lib/contexts";

const initBlogStructure: BlogStructure = {
  title: "",
  bannerUrl: "",
  desc: "",
  draft: false,
  featured: false,
  content: { blocks: [] },
};

export const Editor = () => {
  const [blogData, setBlogData] = useState<BlogStructure>(initBlogStructure);

  const [editorState, setEditorState] = useState<EditorState>("editor");

  return (
    <EditorContext.Provider
      value={{ blogData, setBlogData, editorState, setEditorState }}
    >
      {editorState === "editor" ? <BlogEditor /> : <PublishForm />}
    </EditorContext.Provider>
  );
};
