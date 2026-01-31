<template>
	<section id="intro-section" class="club-intro-section position-relative">
		<!-- Background Decorative Elements -->
		<div class="bg-decoration-1"></div>
		<div class="bg-decoration-2"></div>

		<div class="container position-relative z-index-1 py-5">
			<div class="position-relative">
				<pv-carousel
					class="info-carousel nav-outer show-nav-hover custom-nav-position"
					:options="infoSlider"
				>
					<!-- Slide 1: About Us (Original Content) -->
					<div class="swiper-slide">
						<!-- Header Section -->
						<div class="heading text-center mb-5">
							<h2
								class="text-uppercase font-weight-extra-bold display-4 mb-3 text-gradient appear-animate"
								data-animation-name="fadeInUpShorter"
								data-animation-delay="200"
								v-animate
							>{{ introTitle }}</h2>
							<div
								class="divider mx-auto bg-primary appear-animate"
								data-animation-name="fadeInUpShorter"
								data-animation-delay="300"
								style="width: 80px; height: 4px; border-radius: 2px;"
								v-animate
							></div>
						</div>

						<div class="row align-items-start">
							<!-- Left Column: Visual Identity -->
							<div class="col-lg-5 mb-5 mb-lg-0">
								<div
									class="visual-wrapper position-relative appear-animate"
									data-animation-name="fadeInRightShorter"
									data-animation-delay="400"
									v-animate
								>
									<div class="visual-gallery mx-auto">
										<div class="gallery-item item-1 bg-white p-2 shadow-lg">
											<img
                                                v-if="introImage1"
												:src="introImage1"
												alt="Club Activity 1"
												class="w-100 h-100 object-cover rounded"
											>
										</div>
										<div class="gallery-item item-2 bg-white p-2 shadow-lg">
											<img
                                                v-if="introImage2"
												:src="introImage2"
												alt="Club Activity 2"
												class="w-100 h-100 object-cover rounded"
											>
										</div>
									</div>
									<!-- Floating Elements -->
									<div class="floating-badge badge-1 shadow">
										<i class="fas fa-code text-primary"></i>
									</div>
									<div class="floating-badge badge-2 shadow">
										<i class="fas fa-network-wired text-info"></i>
									</div>
									<div class="floating-badge badge-3 shadow">
										<i class="fas fa-users text-warning"></i>
									</div>
								</div>
							</div>

							<!-- Right Column: Content -->
							<div
								class="col-lg-7 pl-lg-5 appear-animate"
								data-animation-name="fadeInLeftShorter"
								data-animation-delay="600"
								v-animate
							>


								<p class="lead text-dark mb-4 text-justify" style="font-size: 1.6rem; line-height: 1.6;">
                                    <span v-if="homeIntro && homeIntro.description_1">{{ homeIntro.description_1 }}</span>
								</p>

								<div class="content-box bg-light p-4 rounded mb-4 border-left-primary">
									<p class="mb-0 text-dark text-justify" style="font-size: 1.5rem; line-height: 1.6;">
                                        <span v-if="homeIntro && homeIntro.description_2">{{ homeIntro.description_2 }}</span>
									</p>
								</div>

								<!-- Core Values -->
								<div class="values-section">
									<h5 class="font-weight-bold text-uppercase ls-md text-dark mb-3">{{ introCoreValuesTitle }}</h5>
									<div class="d-flex flex-wrap">
										<div 
                                            class="value-item mr-3 mb-3 px-3 py-2 bg-white shadow-sm rounded-pill border"
                                            v-for="(val, index) in introCoreValues"
                                            :key="index"
                                        >
											<span :class="`dot bg-${val.color} mr-2`"></span>
											<span class="font-weight-bold text-dark">{{ val.text }}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Slide 2: Development Orientation -->
					<div class="swiper-slide">
						<!-- Header Section -->
						<div class="heading text-center mb-5">
							<h2
								class="text-uppercase font-weight-extra-bold display-4 mb-3 text-gradient"
							>{{ orientationTitle }}</h2>
							<div
								class="divider mx-auto bg-primary"
								style="width: 80px; height: 4px; border-radius: 2px;"
							></div>
						</div>

						<div class="row">
							<div class="col-lg-12">
								<p class="lead text-dark text-center mb-5 font-weight-medium"style="font-size: 1.6rem; line-height: 1.6;">
									{{ orientationContent }}
								</p>

								<div class="row align-items-stretch">
                                    <div 
                                        class="col-lg-4 col-md-6 mb-4" 
                                        v-for="(item, index) in homeOrientations" 
                                        :key="index"
                                    >
                                        <div :class="`feature-box d-flex align-items-start p-4 bg-white shadow-sm rounded border-left-${item.color || 'primary'}`">
                                            <div :class="`icon-box text-${item.color || 'primary'} mr-3 mt-1`">
                                                <i :class="`${item.icon} fa-2x`"></i>
                                            </div>
                                            <div class="feature-content">
                                                <h4 class="font-weight-bold text-dark mb-2">{{ item.title }}</h4>
                                                <p class="mb-0 text-justify">{{ item.description }}</p>
                                            </div>
                                        </div>
                                    </div>
								</div>
							</div>
						</div>
					</div>
				</pv-carousel>
			</div>
		</div>
	</section>
</template>

<script>
import PvCarousel from '~/components/ui/PvCarousel';
import { baseSlider1 } from '~/utils/data/carousel';
import { baseUrl } from '~/api';

export default {
	name: 'PvClubIntro',
	components: {
		PvCarousel
	},
	data: function () {
		return {
			infoSlider: {
				...baseSlider1,
				slidesPerView: 1,
				spaceBetween: 250, /* Verify space between slides */
				loop: false,
				autoplay: {
					delay: 10000,
					disableOnInteraction: false
				},
				navigation: false,
				pagination: {
					el: '.swiper-dots',
					clickable: true
				}
			}
		};
	},
    computed: {
        homeIntro() {
            return this.$store.state.homeIntro;
        },
        introTitle() {
            return (this.homeIntro && this.homeIntro.title) ? this.homeIntro.title : '';
        },

        introImage1() {
            if (this.homeIntro && this.homeIntro.image_1) {
                const url = this.homeIntro.image_1.url;
                return url.startsWith('http') ? url : `${baseUrl}${url}`;
            }
            return null;
        },
        introImage2() {
            if (this.homeIntro && this.homeIntro.image_2) {
                const url = this.homeIntro.image_2.url;
                return url.startsWith('http') ? url : `${baseUrl}${url}`;
            }
            return null;
        },
        introCoreValues() {
            if (this.homeIntro && this.homeIntro.core_values) {
                // Now an array of objects { id, text, color }
                return this.homeIntro.core_values;
            }
            
            return [];
        },
        introCoreValuesTitle() {
            return (this.homeIntro && this.homeIntro.core_values_title) ? this.homeIntro.core_values_title : '';
        },
        homeOrientations() {
            // homeOrientations from store is now a Single Type Object
            if (this.$store.state.homeOrientations) {
                return this.$store.state.homeOrientations.items || [];
            }
            return [];
        },
        orientationTitle() {
            if (this.$store.state.homeOrientations) {
                return this.$store.state.homeOrientations.title;
            }
            return '';
        },
        orientationContent() {
             if (this.$store.state.homeOrientations) {
                return this.$store.state.homeOrientations.content;
            }
            return '';
        }
    }
};
</script>

