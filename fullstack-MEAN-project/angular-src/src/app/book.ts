import { Rating } from './rating';

export interface Book {
	id: string;
	title: string;
	description: string;
	author: string;
	ISBN: string;
	ratings: Rating;
	avgRating: number;
	year: string;
	publisher: string;
	genres: Array<string>;
	image: string;
};