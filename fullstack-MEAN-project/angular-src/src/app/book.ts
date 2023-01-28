import { Rating } from './rating';

export interface Book {
	id: string;
	title: string;
	author: string;
	ISBN: string;
	ratings: Rating;
	year: string;
	image: string
};