import create from 'zustand';
import {User} from "../Models/User.ts";

type UserStore = {
  connectedUser: User;
  setUser: (NewUser: any) => void;
};

export const useUserStore = create<UserStore>((set) => (
  {
    connectedUser:{},
    setUser: (NewUser: User) => set({ connectedUser: NewUser }),
  }
));