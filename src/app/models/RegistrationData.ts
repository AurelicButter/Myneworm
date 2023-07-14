export class RegistrationData {
	username: string;
	password: string;
	confirmed: string;
	email: string | null;
	birthday: Date;
	accessCode: string;
	acceptPolicy = false;
}
