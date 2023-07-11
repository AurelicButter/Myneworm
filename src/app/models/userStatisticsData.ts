export interface UserStatisticsProfile {
	user_id: number;
	active_reading: number;
	active_completed: number;
	active_paused: number;
	active_dropped: number;
	active_planning: number;
	owner_wanting: number;
	owner_loaned: number;
	owner_previous: number;
	owner_owned: number;
	type_paperback: number;
	type_ebook: number;
	type_hardcover: number;
	type_audiobook: number;
}
