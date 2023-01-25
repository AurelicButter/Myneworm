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
			`We currently only track English translations of manga and light novels with ISBN numbers. If a title does not meet those conditions, then the
			title is not tracked. If a title meets those conditions, we might have missed it! Submit a data correction form and a moderator will review
			and potentially approve the changes!`
		],
		[
			"Why aren't J-Novel Club Parts tracked",
			"While the J-Novel parts are English translated, they do not have ISBN numbers or a whole book. Thus don't meet the minimum requirements."
		]
	],
	"Other Questions": [
		[
			"I found a bug or have an issue with the site!",
			"Please report it so we can fix it! You can do on our " +
				"<a href='https://github.com/Butterstroke/Myneworm/issues/new/choose'>GitHub repository</a>" +
				" or contact us via our support page."
		],
		["How can I contact you?", "You can find all of the contact information on our support page."]
	]
};
