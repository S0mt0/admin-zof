// import { create } from "zustand";

// export const blogStore = create<BlogStore>()((set) => ({
//   accessToken: null,
//   trusted_device: JSON.parse(localStorage.getItem("trusted_device")!) || false,
//   isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")!) || false,

//   setBlogToken: (accessToken) => set(() => ({ accessToken })),

//   setTrustDevice: (trusted_device) =>
//     set(() => {
//       localStorage.setItem("trusted_device", JSON.stringify(trusted_device));
//       return { trusted_device };
//     }),

//   toggleIsTrustedDevice: () =>
//     set((state) => {
//       localStorage.setItem(
//         "trusted_device",
//         JSON.stringify(!state.trusted_device)
//       );
//       return { trusted_device: !state.trusted_device };
//     }),

//   setIsLoggedIn: (isLoggedIn) =>
//     set(() => {
//       localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
//       return { isLoggedIn };
//     }),

//   endSession: () => {
//     localStorage.setItem("isLoggedIn", "false");
//     set(() => ({
//       trusted_device: false,
//       isLoggedIn: false,
//       accessToken: null,
//     }));
//   },
// }));
