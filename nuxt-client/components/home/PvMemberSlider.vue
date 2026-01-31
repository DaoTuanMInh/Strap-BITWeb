<template>
	<section id="member-section" class="member-section position-relative py-5">
		<div
			class="container appear-animate"
			data-animation-name="fadeInUpShorter"
			data-animation-delay="200"
			v-animate
		>
			<div class="heading text-uppercase text-center mb-5">
				<h2
					class="text-capitalize text-dark font-weight-bold mb-3 appear-animate"
					data-animation-delay="100"
					data-animation-name="fadeIn"
					v-animate
				>{{ sectionTitle }}</h2>
				<div class="divider mx-auto bg-primary mb-3" style="width: 100px; height: 4px;"></div>
			</div>

			<pv-carousel
				class="categories-slider swiper-carousel swiper-theme show-nav-hover nav-outer"
				:options="categorySlider"
                v-if="members.length > 0"
			>
				<div
					class="appear-animate swiper-slide"
					data-animation-name="fadeInUpShorter"
					v-animate
					v-for="(member, index) in members"
					:key="index"
				>
					<div class="member-overlay-card position-relative overflow-hidden rounded-lg">
						<figure class="m-0 p-0 w-100">
							<img
                                v-if="member.image"
								:src="baseUrl + member.image.url"
								:alt="member.title"
								class="w-100 object-cover hover-zoom"
								style="height: 350px;"
							/>
						</figure>
						<div class="member-overlay d-flex flex-column justify-content-end p-4">
							<h3 class="font-weight-bold text-white text-5 mb-1">{{ member.title }}</h3>
							<span class="text-uppercase font-size-sm text-light opacity-8 ls-md">{{ member.note }}</span>
							<div class="overlay-line mt-2"></div>
						</div>
					</div>
				</div>
			</pv-carousel>
		</div>
	</section>
</template>

<script>
import PvCarousel from '~/components/ui/PvCarousel';
import { categorySlider } from '~/utils/data/carousel';
import { mapState } from 'vuex';
import { baseUrl } from '~/api';

export default {
	components: {
		PvCarousel
	},
	data: function () {
		return {
			baseUrl: baseUrl,
			categorySlider: {
				...categorySlider,
				slidesPerView: 4,
				spaceBetween: 20,
				breakpoints: {
					480: { slidesPerView: 1 },
					576: { slidesPerView: 2 },
					768: { slidesPerView: 3 },
					992: { slidesPerView: 4 }
				}
			}
		}
	},
	computed: {
		...mapState(['homeMembers']),
		members() {
			return (this.homeMembers && this.homeMembers.content) || [];
		},
		sectionTitle() {
			return (this.homeMembers && this.homeMembers.title) || '';
		}
	}
}
</script>
