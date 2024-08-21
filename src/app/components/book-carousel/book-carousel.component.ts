import { CommonModule } from "@angular/common";
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { HostListener } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BookData } from "src/app/models/bookData";
import { DateReadablePipe } from "src/app/pipes/DateReadable.pipe";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { SwiperContainer } from "swiper/element";

@Component({
	selector: "book-carousel",
	standalone: true,
	imports: [CommonModule, DateReadablePipe, RouterModule],
	templateUrl: "./book-carousel.component.html",
	styleUrl: "./book-carousel.component.css",
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookCarouselComponent implements AfterViewInit {
	carouselSelected: SwiperContainer | null;
	@Input() title: string;
	@Input() carouselIndex: string;
	@Input() books: BookData[] = [];
	slidePerView = 1;
	slidePerSkip = 1;
	screenWidth: number;
	swiperParams = {
		injectStyles: [
			`
			.swiper-button-next, .swiper-button-prev { 
				--swiper-navigation-sides-offset: 15px;
				color: #ECEBF3; 
				background-color: #1F2232; 
				padding: 6px;
				border-radius: 0.5rem;
				opacity: 0;
				transition-duration: .3s;
				transition-property: all;
				transition-timing-function: ease-in-out;
			}
			.swiper-button-next {
				border-radius: 2rem 0rem 0rem 2rem;
    			padding: 25px 8px 25px 20px;
			}
			.swiper-button-prev {
				border-radius: 0rem 2rem 2rem 0rem;
    			padding: 25px 20px 25px 8px;
			}
			.swiper-button-next:hover, .swiper-button-prev:hover { 
				background-color: #0D98BA; 
			}
			.hovered-container {
				opacity: 1;
			}
		`
		],
		navigation: {
			enabled: true
		}
	};

	constructor(private service: MynewormAPIService) {
		this.getScreenSize();
	}

	@HostListener("window:resize", ["$event"])
	getScreenSize() {
		this.screenWidth = window.innerWidth;
		this.calcSlidePreview();
	}

	ngAfterViewInit() {
		this.carouselSelected = document.querySelectorAll("swiper-container")[Number(this.carouselIndex) - 1];

		if (this.carouselSelected !== null) {
			Object.assign(this.carouselSelected, this.swiperParams);
			this.carouselSelected.initialize();
		}
	}

	calcSlidePreview() {
		if (this.screenWidth >= 1600) {
			this.slidePerView = 5;
			this.slidePerSkip = 2;
			return;
		}
		if (this.screenWidth >= 1024) {
			this.slidePerView = 3;
			this.slidePerSkip = 2;
			return;
		}
		if (this.screenWidth >= 640) {
			this.slidePerView = 2;
			this.slidePerSkip = 1;
			return;
		}
		this.slidePerView = 1;
		this.slidePerSkip = 1;
	}

	onMouseHover() {
		const shadowRoot = this.carouselSelected?.shadowRoot;

		const leftArrow = shadowRoot?.querySelector(".swiper-button-prev");
		const rightArrow = shadowRoot?.querySelector(".swiper-button-next");

		if (!leftArrow?.classList.contains("hovered-container")) {
			leftArrow?.classList.add("hovered-container");
			rightArrow?.classList.add("hovered-container");
		} else {
			leftArrow?.classList.remove("hovered-container");
			rightArrow?.classList.remove("hovered-container");
		}
	}

	getCover(isbn: string) {
		return this.service.getCover(isbn, "small");
	}
}
