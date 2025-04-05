type ApiResponse<T = null> = {
  statusCode: number;
  response: string | object;
  timestamp: string;
  data?: T;
};

type LoginDto = {
  email: string;
  password: string;
};

type SignUpDto = LoginDto & { confirm_password };

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

interface ListItem {
  content: string;
  items: ListItem[];

  [key: string]: any;
}

interface BlockData {
  text?: string;
  level?: number;
  style?: "unordered" | "ordered";
  items?: ListItem[];
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
interface TBlog extends BlogStructure {
  blogId: string;
  createdAt: string;
  updatedAt: string;
}

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

interface EventsData {
  events: TEventSnippet[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// NGO Events
interface TEvent extends EventStructure {
  eventId: string;
  createdAt: string;
  updatedAt: string;
}

interface EventStructure {
  eventId?: string;
  title: string;
  desc: string;
  bannerUrl: string;
  featured: boolean;
  draft: boolean;
  scheduledFor?: Date;
  content: { blocks: any[] } & { [key: string]: any };
}

type TEventSnippet = Omit<TEvent, "content">;

interface ITeam {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;

  [key: string]: any;
}

type EditorState = "editor" | "publish-form";

interface IBlogEditorContext {
  blogData: BlogStructure;
  setBlogData: (data: BlogStructure) => void;
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  draftState: boolean;
  setDraftState: (draft: boolean) => void;
  type: "new" | "edit";
}

interface IEventEditorContext {
  eventData: EventStructure;
  setEventData: (data: EventStructure) => void;
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  draftState: boolean;
  setDraftState: (draft: boolean) => void;
  type: "new" | "edit";
  date?: Date;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

interface BlogStructure {
  blogId?: string;
  title: string;
  bannerUrl: string;
  desc: string;
  draft: boolean;
  featured: boolean;
  content: { blocks: any[] } & { [key: string]: any };
}

interface EditorTools {
  [toolName: string]: EditorJS.ToolConstructable | EditorJS.ToolSettings;
}
