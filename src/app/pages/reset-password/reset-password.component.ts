import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { email as emailPattern } from "src/app/models/validationPatterns";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { LazyLoadStyleService } from "src/app/services/lazy-load-style.service";
import { MetadataService } from "src/app/services/metadata.service";

@Component({
	standalone: true,
	selector: "reset-password",
	templateUrl: "./reset-password.component.html",
	imports: [CommonModule, FormsModule]
})
export class ResetPasswordComponent {
	email = "";
	isSubmitted = false;
	emailPattern = emailPattern;

	constructor(
		private lazyLoad: LazyLoadStyleService,
		private metaService: MetadataService,
		private authService: AuthenticationService
	) {
		this.metaService.updateMetaTags("Reset Password", "/reset");
	}

	ngOnInit() {
		this.lazyLoad.loadStyle("authentication-pages");
	}

	submit() {
		this.authService.resetPasswordRequest(this.email).subscribe(() => {
			this.isSubmitted = true;
		});
	}
}
