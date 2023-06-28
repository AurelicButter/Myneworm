function zeroAdder(value: number) {
	if (value < 10) {
		return "0" + value;
	}
	return value;
}

export function formatDateString(dateInput: string) {
	const dateObj = new Date(dateInput);

	return `${zeroAdder(dateObj.getDate())}-${zeroAdder(dateObj.getMonth())}-${dateObj.getFullYear()}`;
}
