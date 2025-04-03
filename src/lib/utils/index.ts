import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BlockToolConstructable,
  InlineToolConstructable,
  ToolConstructable,
  ToolSettings,
} from "@editorjs/editorjs";

import ImageTool from "@editorjs/image";
import HeaderTool from "@editorjs/header";
import ListTool from "@editorjs/list";
import QuoteTool from "@editorjs/quote";
import InlineCodeTool from "@editorjs/inline-code";

// import Embed from "@editorjs/embed";
// import Marker from "@editorjs/marker";
// import Link from "@editorjs/link";

import { uploadImage } from "../api/requests";

const Image: BlockToolConstructable = ImageTool;
const Quote: BlockToolConstructable = QuoteTool;
const InlineCode: InlineToolConstructable = InlineCodeTool;
const Header = HeaderTool as unknown as BlockToolConstructable;
const List = ListTool as unknown as BlockToolConstructable;

interface EditorTools {
  [toolName: string]: ToolConstructable | ToolSettings;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const editorTools: EditorTools = {
  inlineCode: InlineCode,
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },

  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: async (e: unknown) => {
          return uploadImage(e as File).then((url) => {
            if (url)
              return {
                success: 1,
                file: { url },
              };
          });
        },
      },

      uploadByUrl: async (e: unknown) => {
        const link = new Promise((resolve, reject) => {
          try {
            resolve(e);
          } catch (err) {
            reject(err);
          }
        });

        return link.then((url) => {
          return {
            success: 1,
            file: { url },
          };
        });
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type a heading...",
      levels: [1, 2, 3],
      defaultLevel: 2,
    },
  },

  // embed: Embed,
  // marker: Marker,
  // link: Link,
};
