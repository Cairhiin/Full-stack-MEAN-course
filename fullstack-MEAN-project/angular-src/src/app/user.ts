import { Rating } from './rating';

export interface User {
	_id: string;
	name: string;
	email: string;
	username: string;
	ratings: Array<{ id: string, rating: number }>;
}