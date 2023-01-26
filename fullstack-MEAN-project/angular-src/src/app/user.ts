import { Rating } from './rating';

export interface User {
	id: string;
	name: string;
	email: string;
	username: string;
	ratings: Array<Rating>;
}