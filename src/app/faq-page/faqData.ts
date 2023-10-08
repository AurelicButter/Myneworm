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
			`We currently accept any English translations for manga and light novels based on our database guidelines. You can find the details on
			our guideline page <a href='/guidelines'>here</a>.`
		],
		[
			"Why can't I find X title?",
			`As stated previously, we currently track English translations. If a title does not meet our guidelines, then we do not track it. However,
			if the title meets our guidelines and isn't on the site yet, we might have missed it! You can submit a data correction form
			<a href='/faq'>here</a>. A moderator will review and potentially approve your changes!`
		],
		[
			"Why aren't J-Novel Club Parts tracked",
			"While the J-Novel parts are English translated, they do not have ISBN numbers or a whole book. Thus don't meet the minimum requirements."
		]
	],
	"Account Questions": [],
	"Other Questions": [
		[
			"I found a bug or have an issue with the site!",
			"Please report it so we can fix it! You can do on our " +
				"<a href='https://github.com/Butterstroke/Myneworm/issues/new/choose'>GitHub repository</a>" +
				" or contact us via our support page."
		],
		["I want to delete my account. Where can I do that?"],
		[
			"How can I contact you?",
			"If you have further questions or need support, please reach out to <a href='mailto:myneworm@katsurin.com'>myneworm@katsurin.com</a>, explaining your issue."
		]
	]
};
