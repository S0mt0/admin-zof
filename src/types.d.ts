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
