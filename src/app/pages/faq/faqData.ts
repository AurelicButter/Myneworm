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
			"What is accepted in Myneworm's Database?",
			`We accept any English translations for manga, light novels, and their adjacent book-based media that meets our database guidelines. Details on 
			what we define as acceptable can be found on our <a href='/guidelines'>database guidelines</a> page.`
		],
		[
			"Why can't I find X title?",
			`Depending on the title, we might have missed it! Please review our <a href='/guidelines'>database guidelines</a> to double check if 
			it qualifies. If it does, fill out a <a href="/book/correction">blank correction form here</a>!`
		],
		[
			"Why aren't J-Novel Club Parts tracked",
			"J-Novel parts do not contain ISBN numbers or are an entire book and are ineligible."
		]
	],
	Lists: [
		[
			"How do I add/remove books from my wishlist?",
			"To add a book to your wishlist, you'll need to mark the book as 'Wanted' in the owner status. To remove the book, change the owner status so that 'Wanted' is not selected."
		]
	],
	"Other Questions": [
		[
			"I found a bug or have an issue with the site!",
			"Please report it so we can fix it! You can do on our " +
				"<a href='https://github.com/Butterstroke/Myneworm/issues/new/choose'>GitHub repository</a>" +
				" or contact us via our support page."
		],
		[
			"How can I contact you?",
			"If you have further questions or need support, please reach out to <a href='mailto:myneworm@katsurin.com'>myneworm@katsurin.com</a>, explaining your issue."
		]
	]
};
