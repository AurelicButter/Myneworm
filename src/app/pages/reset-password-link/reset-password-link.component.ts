import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { passwordHelp, password as validation } from "src/app/models/validationPatterns";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { LazyLoadStyleService } from "src/app/services/lazy-load-style.service";
import { MetadataService } from "src/app/services/metadata.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
	standalone: true,
	selector: "reset-password-link",
	templateUrl: "./reset-password-link.component.html",
	imports: [CommonModule, FormsModule]
})
export class ResetPasswordLinkComponent {
	password: string;
	confirmPassword: string;
	passwordPattern = new RegExp(validation);
	passwordHelp = passwordHelp;
	private resetID: string;

	constructor(
		private authService: AuthenticationService,
		private metaService: MetadataService,
		private lazyLoad: LazyLoadStyleService,
		private toastService: ToastService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.metaService.updateMetaTags("Reset Password", "/reset");
	}

	ngOnInit() {
		this.lazyLoad.loadStyle("authentication-pages");

		this.route.params.subscribe((data) => {
			this.resetID = data.resetID;

			if (this.resetID.length !== 64) {
				this.router.navigate(["/login"]);
				return;
			}
		});
	}

	submit() {
		this.authService.resetPassword(this.resetID, this.password).subscribe((data) => {
			if (!data) {
				this.toastService.sendError("Failed to reset password.");
				return;
			}

			this.toastService.sendSuccess("Password reset! Please login to continue");
			this.router.navigate(["/login"]);
		});
	}
}
