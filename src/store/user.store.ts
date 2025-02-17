// logged in user global state with zustand store
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { ICurrentUser } from "../service/login/login.dto"

interface IUserStore {
    loading: boolean
    user?: ICurrentUser
    // * actions

    setCurrentUser: (user: ICurrentUser) => void
    logout: () => void
}

export const useUserStore = createWithEqualityFn<IUserStore>()((set) => {
    return {
        loading: true,
        user: undefined,
        // * actions
        setCurrentUser: (user: ICurrentUser) => {
            set((old) => ({ ...old, user: user, loading: false }))
        },
        logout: () => {
            set((old) => ({ ...old, user: undefined, loading: false }))
        },
    }
}, shallow)
