export interface ListEntry {
	list_id: number;
	user_id: number;
	isbn: number;
	title: string;
	start_date?: string;
	end_date?: string;
	book_type: string;
	score: number;
	reread: number;
	active_status: string;
	owner_status: string;
	notes?: string;
	isExpanded?: boolean;
}
