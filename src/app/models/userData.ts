export interface UserData {
	user_id: number;
	username: string;
	role_id: number;
	create_date: string;
	last_login: string;
	birthday: string | null;
	display_name: string | null;
	about_me: string | null;
	location: string | null;
	displaybirthday?: boolean;
	wishlist_msg: string | null;
}

export interface AccountData {
	user_id: number;
	username: string;
	role_id: number;
	create_date: string;
	last_login: string;
	birthday: string;
	email: string;
	password?: string;
	confirm?: string;
}
