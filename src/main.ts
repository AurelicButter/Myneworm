import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { register } from "swiper/element/bundle";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
	enableProdMode();
}

register();

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
