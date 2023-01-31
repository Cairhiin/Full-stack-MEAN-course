import { Rating } from './rating';

export interface User {
	_id: string;
	name: string;
	email: string;
	username: string;
	role: string;
	reviews: Array<{ id: string, review: string, date: Date }>;
	ratings: Array<{ id: string, rating: number, date: Date }>;
}