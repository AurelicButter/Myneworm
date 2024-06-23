import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from "@angular/core";
import { HostListener } from "@angular/core";
import { SwiperContainer } from "swiper/element";

@Component({
	selector: "book-carousel",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./book-carousel.component.html",
	styleUrl: "./book-carousel.component.css",
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookCarouselComponent implements OnInit {
	carouselSelected: SwiperContainer | null;
	@Input() title: string;
	@Input() carouselIndex: string;
	books: any[] = [];
	slidePerView = 1;
	slidePerSkip = 1;
	screenWidth: number;
	swiperParams = {
		injectStyles: [
			`
			.swiper-button-next, .swiper-button-prev { 
				color: #ECEBF3; 
				background-color: #1F2232; 
				padding: 6px;
				border-radius: 0.5rem;
				opacity: 0;
				transition-duration: .3s;
				transition-property: all;
				transition-timing-function: ease-in-out;
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

	constructor() {
		this.getScreenSize();
	}

	@HostListener("window:resize", ["$event"])
	getScreenSize() {
		this.screenWidth = window.innerWidth;
		this.calcSlidePreview();
	}

	ngOnInit(): void {
		this.carouselSelected = document.querySelectorAll("swiper-container")[Number(this.carouselIndex) - 1];

		for (let i = 1; i < 10; i++) {
			this.books.push({
				bookId: i,
				name: "Lorum Ipsum",
				coverURL: "./assets\\9781638580645.jpg"
			});
		}

		if (this.carouselSelected !== null) {
			Object.assign(this.carouselSelected, this.swiperParams);
			this.carouselSelected.initialize();
		}
	}

	calcSlidePreview() {
		if (this.screenWidth >= 1600) {
			this.slidePerView = 6;
			this.slidePerSkip = 3;
			return;
		}
		if (this.screenWidth >= 1024) {
			this.slidePerView = 4;
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
}
