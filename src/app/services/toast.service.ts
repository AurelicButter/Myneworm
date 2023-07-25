import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ToastService {
	msgEvent: BehaviorSubject<any> = new BehaviorSubject({});
	messages: { message: string; status: string }[] = [];

	constructor() {
		this.msgEvent.next(this.messages);
	}

	sendMessage(content: string, status: string) {
		this.messages.push({ message: content, status: status });
		this.msgEvent.next(this.messages);
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
