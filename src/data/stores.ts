import { persistentAtom } from '@nanostores/persistent'
export const $genomeListMode = persistentAtom<string>('genomeListMode', 'cards')
