/*
 * Contents to be displayed on the FAQ page.
 *
 * Format:
 * Section Header: arr[][] (Key 1 for Question, Key 2 for Answer)
 *
 * Both question and answer strings are in raw HTML format. Any string specific formating should be written in HTML formatting.
 */

export const FAQData = {
	Database: [
		[
			"Why can't I find X title?",
			`We currently only track English translations of manga and light novels. So if the title does not meet those conditions, then the title is not tracked.
            If it is eligible, we might have missed it! Submit a data correction form and a moderator will review and potentially approve the change.`
		]
	],
	"Other Questions": [["How can I contact you?", "You can find all of the contact information on our support page."]]
};
