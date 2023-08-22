import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ToastNotification } from "../models/toastNotification";

@Injectable({
	providedIn: "root"
})
export class ToastService {
	msgEvent: BehaviorSubject<ToastNotification[]> = new BehaviorSubject<ToastNotification[]>([]);
	messages: ToastNotification[] = [];

	constructor() {
		this.msgEvent.next(this.messages);
	}

	sendMessage(content: string, status: string) {
		this.messages.push({ message: content, status: status });
		this.msgEvent.next(this.messages);
		setTimeout(
			() => this.dismissMessage(this.messages.length - 1),
			Math.max(Math.min(content.length * 50, 2000), 7000)
		);
	}

	dismissMessage(msgIndex: number) {
		this.messages.splice(msgIndex, 1);
		this.msgEvent.next(this.messages);
	}

	sendError(content: string) {
		this.sendMessage(content, "error");
	}

	sendSuccess(content: string) {
		this.sendMessage(content, "success");
	}

	sendInfo(content: string) {
		this.sendMessage(content, "info");
	}
}
