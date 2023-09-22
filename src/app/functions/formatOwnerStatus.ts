export function formatOwnerStatus(status: string): string {
	if (status === null) {
		return "";
	}
	if (status === "owned") {
		return "Owned";
	}
	if (status === "loaned") {
		return "Loaned";
	}
	if (status === "previous_own") {
		return "Previously Owned";
	}
	if (status === "wanting") {
		return "Wanted";
	}
	if (status === "ordered") {
		return "Ordered";
	}
	return "Failed to translate status";
}
