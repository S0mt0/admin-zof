import { create } from "zustand";

export const profileStore = create<ProfileStore>()((set) => ({
  profile: null,
  setProfile: (profile) => set(() => ({ profile })),
}));
