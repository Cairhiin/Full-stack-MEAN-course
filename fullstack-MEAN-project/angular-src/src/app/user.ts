import { Rate } from './rate';

export interface User {
	_id: string;
	name: string;
	email: string;
	username: string;
	role: string;
	reviews: Array<{ id: string, review: string, date: Date }>;
	ratings: Array<Rate>;
}