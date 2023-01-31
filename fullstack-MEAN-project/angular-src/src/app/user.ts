import { Rate } from './rate';
import { Book } from './book';

export interface User {
	_id: string;
	name: string;
	email: string;
	username: string;
	role: string;
	reviews: Array<{ id: string, review: string, date: Date }>;
	ratings: Array<Rate>;
	reading?: Book;
}