/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { BlogEditor } from "./components/blog-editor";
import { PublishForm } from "./components/publish-form";
import { BlogEditorContext } from "@/lib/contexts";
import { initBlogStructure } from "./components";
import { getBlog } from "@/lib/api/requests";

export const Editor = ({ type }: { type: "new" | "edit" }) => {
  const [blogData, setBlogData] = useState<BlogStructure>(initBlogStructure);
  const [editorState, setEditorState] = useState<EditorState>("editor");
  const [draftState, setDraftState] = useState<boolean>(false);

  const blogId = useParams().blogId || "";

  if (type === "edit") {
    const { data: blog, isSuccess } = useQuery({
      queryKey: ["blog", blogId],
      queryFn: () => getBlog(blogId),
    });

    useEffect(() => {
      if (isSuccess && blog) setBlogData(blog);
    }, [blog, isSuccess]);
  }

  return (
    <BlogEditorContext.Provider
      value={{
        blogData,
        setBlogData,
        editorState,
        setEditorState,
        draftState,
        setDraftState,
        type,
      }}
    >
      {editorState === "editor" ? <BlogEditor /> : <PublishForm />}
    </BlogEditorContext.Provider>
  );
};
