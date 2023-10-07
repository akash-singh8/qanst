import { atom } from "recoil";

type UserData = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const userState = atom<UserData>({
  key: "userState",
  default: {
    name: undefined,
    email: undefined,
    image: undefined,
  },
});

export default userState;
