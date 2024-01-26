import { atom } from 'jotai'

export const boardSizeAtom = atom<8|10>(8)

export const themeAtom = atom<'cats'|'dogs'>('cats')

export const userAtom = atom<User>({name:null, password:null})


export interface User {
    name: string | null;
    password: string | null;
}