import { atom } from 'jotai'

export const boardSizeAtom = atom<8|10>(8)

export const themeAtom = atom<'cats'|'dogs'>('cats')