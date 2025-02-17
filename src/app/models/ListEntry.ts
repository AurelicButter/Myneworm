export interface ListEntry {
	list_id: number;
	user_id: number;
	isbn: number;
	title: string;
	start_date?: string | null;
	end_date?: string | null;
	book_type_name: string;
	score: number;
	reread: number;
	active_status: string;
	owner_status: string;
	notes?: string;
	isExpanded?: boolean;
	isFavourite: boolean;
}

export class ListEntryClass implements ListEntry {
	list_id: number;
	user_id: number;
	isbn: number;
	title: string;
	start_date?: string | null;
	end_date?: string | null;
	book_type_name: string;
	score: number;
	reread: number;
	active_status: string;
	owner_status: string;
	notes?: string;
	isExpanded?: boolean;
	isFavourite: boolean;
}
