import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "toast-messages",
	templateUrl: "./toast-messages.component.html",
	styleUrls: ["./toast-messages.component.css"],
	imports: [CommonModule],
	standalone: true
})
export class ToastMessagesComponent {
	messages: { message: string; status: string }[];

	constructor(private toastService: ToastService) {
		this.toastService.msgEvent.subscribe((notifications) => {
			this.messages = notifications;
		});
	}

	applyStyle(status: string) {
		if (status === "error") {
			return "text-bg-danger toast-text-white";
		}
		if (status === "success") {
			return "text-bg-success toast-text-white";
		}
		return "text-bg-info toast-text-black";
	}

	applyButtonStyle(status: string) {
		if (status === "error" || status === "success") {
			return "btn-close-white";
		}
		return "btn-close-black";
	}

	close(msgIndex: number) {
		this.toastService.dismissMessage(msgIndex);
	}
}
