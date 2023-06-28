export function formatOwnerStatus(status: string): string {
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
	return "Failed to translate status";
}
