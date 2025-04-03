type ApiResponse<T = null> = {
  statusCode: number;
  response: string | object;
  timestamp: string;
  data?: T;
};

type AuthDto = {
  email: string;
  password: string;
};

type NewPasswordDTO = {
  new_password: string;
  confirm_password: string;
};

type UpdateUserDto = Partial<Pick<User, "email" | "username" | "avatarUrl">>;

type User = {
  _id: string;
  avatarUrl: string;
  username: string;
  email: string;
  google_auth: boolean;
  createdAt: string;
  updatedAt: string;
};

interface AuthStore {
  accessToken: string | null;
  trusted_device: boolean;
  isLoggedIn: boolean;

  setAuthToken(accessToken: string | null): void;
  setTrustDevice(trusted_device: boolean): void;
  setIsLoggedIn(isLoggedIn: boolean): void;
  toggleIsTrustedDevice(): void;
  endSession(): void;
}

interface ProfileStore {
  profile: User | null;
  setProfile(profile: User): void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type BlockType = "paragraph" | "header" | "list" | "image" | "quote";

interface BlockData {
  text?: string;
  level?: number;
  style?: "unordered" | "ordered";
  items?: { content: string; [key: string]: any }[];
  file?: {
    url: string;
    size?: number;
    name?: string;
    extension?: string;
  };
  caption?: string;
  title?: string;

  [key: string]: any;
}

interface Block {
  id: string;
  type: BlockType;
  data: BlockData;
}

// NGO blog
type TBlog = BlogStructure & {
  blogId: string;
  createdAt: string;
  updatedAt: string;
};

type TBlogSnippet = Omit<TBlog, "content">;

interface BlogsData {
  blogs: TBlogSnippet[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// NGO Events
interface TEvent {
  eventId: string;
  title: string;
  desc: string;
  bannerUrl: string;
  featured: boolean;
  scheduledFor: string;
  more_details: string;

  [key: string]: any;
}

type TEventSnippet = Omit<TEvent, "details">;

interface ITeam {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;

  [key: string]: any;
}

type EditorState = "editor" | "publish-form";

interface EditorContextType {
  blogData: BlogStructure;
  setBlogData: (data: BlogStructure) => void;
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  draftState: boolean;
  setDraftState: (draft: boolean) => void;
}

interface BlogStructure {
  title: string;
  bannerUrl: string;
  desc: string;
  draft: boolean;
  featured: boolean;
  content: { blocks: any[] } & { [key: string]: any };
}
