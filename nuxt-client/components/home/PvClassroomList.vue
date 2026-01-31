<template>
	<section class="products-container new-products-container course-list-section bg-dot-pattern">
		<div class="container">
			<div class="heading text-uppercase text-center mb-5">
				<h2
					class="text-capitalize mb-3 appear-animate"
					data-animation-delay="300"
					data-animation-name="fadeInUpShorter"
					v-animate
				>{{ sectionTitle }}</h2>
				<div class="divider mx-auto bg-primary mb-3" style="width: 100px; height: 4px;"></div>
			</div>

			<div class="position-relative">
				<pv-carousel
					class="products-slider custom-products nav-outer show-nav-hover nav-image-center"
					:options="courseSlider"
                    v-if="courses.length > 0"
				>
					<div
						class="swiper-slide course-card-wrapper"
						v-for="(course, index) in courses"
						:key="index"
					>
						<div class="course-card bg-white shadow-lg rounded-xl overflow-hidden position-relative h-100 border-0">
							<!-- Card Image -->
							<div class="course-image-wrapper position-relative">
								<img 
                                    v-if="course.image"
                                    :src="baseUrl + course.image.url" 
                                    :alt="course.title" 
                                    class="w-100 h-100 object-cover"
                                >
								<div class="overlay-gradient"></div>
							</div>

							<!-- Visible Content -->
							<div class="course-visible p-4 d-flex flex-column text-center">
								<h4 class="course-title font-weight-bold text-dark mb-3 mt-2">{{ course.title }}</h4>
								<p class="course-desc text-dark mb-3">{{ course.note }}</p>
								<div class="mt-auto">
									<a href="#" class="read-more">Xem chi tiết</a>
								</div>
							</div>
						</div>
					</div>
				</pv-carousel>
				
				<!-- Custom Navigation Buttons -->
				<div class="custom-nav-prev"><i class="fas fa-chevron-left"></i></div>
				<div class="custom-nav-next"><i class="fas fa-chevron-right"></i></div>
			</div>
		</div>
	</section>
</template>

<script>
import PvCarousel from '~/components/ui/PvCarousel';
import { baseSlider3 } from '~/utils/data/carousel';
import { mapState } from 'vuex';
import { baseUrl } from '~/api';

export default {
	components: {
		PvCarousel
	},
	data: function () {
		return {
			baseUrl: baseUrl,
			courseSlider: {
				...baseSlider3,
				spaceBetween: 20,
				slidesPerView: 3,
				pagination: false,
				isCustomNav: true,
				navigation: {
					nextEl: '.custom-nav-next',
					prevEl: '.custom-nav-prev'
				},
				breakpoints: {
					480: {
						slidesPerView: 1
					},
					768: {
						slidesPerView: 2
					},
					992: {
						slidesPerView: 3
					}
				}
			}
		};
	},
	computed: {
		...mapState(['homeClassrooms']),
		courses() {
			return this.homeClassrooms ? this.homeClassrooms.content : [];
		},
		sectionTitle() {
			return this.homeClassrooms ? this.homeClassrooms.title : '';
		}
	}
};
</script>
