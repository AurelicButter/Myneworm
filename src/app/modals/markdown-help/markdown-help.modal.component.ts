import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MarkdownModule } from "ngx-markdown";

@Component({
	selector: "markdown-help.modal",
	standalone: true,
	imports: [MarkdownModule],
	templateUrl: "./markdown-help.modal.component.html",
	styleUrl: "../modal-styles.css"
})
export class MarkdownHelpModalComponent {
	constructor(private dialogRef: MatDialogRef<MarkdownHelpModalComponent>) {}

	close() {
		this.dialogRef.close();
	}
}
