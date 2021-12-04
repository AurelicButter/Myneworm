import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomePageComponent } from "./home-page.component";

import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin, listPlugin]);

@NgModule({
	declarations: [HomePageComponent],
	imports: [BrowserModule, FullCalendarModule],
	exports: [HomePageComponent]
})
export class HomePageModule {}
