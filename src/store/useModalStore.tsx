import { create } from "zustand";

type State = {
    open: boolean;
    total: number;
    current: number;
};
type Action = {
    handleActionModal: (state: boolean) => void;
    handleActionCurrent: () => void;
    handleActionTotal: (state: number) => void;
};

export const useModalStore = create<State & Action>((set) => ({
    open: false,
    current: 0,
    total: 0,
    handleActionModal: (value: boolean) => set(() => ({ open: value })),
    handleActionCurrent: () => set((value) => ({ current: value.current + 1 })),
    handleActionTotal: (value: number) => set(() => ({ total: value })),
}));
