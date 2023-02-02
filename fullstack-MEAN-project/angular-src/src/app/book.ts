import { Rating } from './rating';
import { Genre } from './genre';

export interface Book {
	id: string;
	title: string;
	description: string;
	author: string;
	ISBN: string;
	ratings: Rating;
	reviews?: Array<string>;
	avgRating: number;
	year: string;
	publisher: string;
	genres: Array<Genre>;
	image: string;
};