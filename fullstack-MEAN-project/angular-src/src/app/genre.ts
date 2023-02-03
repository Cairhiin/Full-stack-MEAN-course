import { Book } from './book';

export interface Genre {
	id: string,
	name: string,
	booksInGenre: Array<Book>
};