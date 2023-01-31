import { Book } from './book'

export interface Rate {
	book: Book,
	rating: number,
	date: Date
};