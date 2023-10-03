import { atom } from "recoil";

const authState = atom({
  key: "authState",
  default: false,
});

export default authState;
