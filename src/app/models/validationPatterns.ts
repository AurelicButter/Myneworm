/**
 * Constants file for any validation patterns and help descriptions to use within the many forms
 * on the site.
 */

/* eslint-disable no-useless-escape */

export const password = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}/;
export const username = /^\S+$/;
export const email = /^\S{1,}@\S{1,}\.\S{1,}$/;

export const passwordHelp =
	"Your password must be at least 8 characters long with one number and one special character.";
