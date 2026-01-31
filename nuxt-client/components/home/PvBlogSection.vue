<template>
	<div class="blog-section p-0 m-0 mt-0 mb-0">
		<div class="container-fluid p-0">
			<div class="event-frame-wrapper" v-if="displayPosts.length > 0">
				<pv-carousel
					class="post-slider swiper-carousel swiper-theme mb-0"
					:options="eventSlider"
				>
					<div
						class="swiper-slide"
						v-for="(post,index) in displayPosts"
						:key="'blog-' + index"
					>
						<div class="event-card">
							<figure class="event-media">
								<img v-if="post.image" :src="getImageUrl(post)" :alt="post.title" class="w-100 object-cover">
								<div class="event-overlay">
                                    <div class="banner-content text-center">
                                        <h3 class="banner-title">{{ post.title }}</h3>
                                        <p class="banner-desc" v-if="post.subtitle">{{ post.subtitle }}</p>
                                    </div>
								</div>
							</figure>
						</div>
					</div>
				</pv-carousel>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import PvCarousel from '~/components/ui/PvCarousel';
import PvBrandSection from '~/components/home/PvBrandSection';
import { blogSlider } from '~/utils/data/carousel';
import { baseUrl } from '~/api';

export default {
	components: {
		PvCarousel,
		PvBrandSection
	},
	data: function () {
		return {
			blogSlider: blogSlider,
			eventSlider: {
				...blogSlider,
				slidesPerView: 1,
				spaceBetween: 0,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false
				},
				breakpoints: {
					576: { slidesPerView: 1 },
					992: { slidesPerView: 1 }
				}
			},
			baseUrl: baseUrl
		}
	},
	computed: {
        ...mapState(['homeAds']),
		displayPosts() {
			return (this.homeAds && this.homeAds.length > 0) ? this.homeAds : [];
		}
	},
	methods: {
		getImageUrl(post) {
            if (!post.image) return '';
            const url = post.image.url;
            return url.startsWith('http') ? url : `${this.baseUrl}${url}`;
		}
	}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap'); /* For the bold EVENTS text */

.event-card {
    position: relative;
    overflow: hidden;
    border-radius: 0;
    min-height: 240px; /* Reduced height as requested */
}

.event-media {
    position: relative;
    margin: 0;
    min-height: 240px;
}

.event-media img {
    display: block;
    width: 100%;
    height: 240px;
    object-fit: cover;
    transition: transform 0.5s ease;
}

/* Subtle zoom on hover */
.event-card:hover .event-media img {
    transform: scale(1.05); 
}

.event-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, 0.6); /* Dark overlay */
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.banner-content {
    max-width: 900px;
    color: #fff;
    padding: 20px;
}

.banner-title {
    font-family: 'Anton', sans-serif; /* Bold, impact-style font */
    font-size: 4rem; /* Reduced to fit 240px */
    line-height: 1;
    margin-bottom: 10px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 5px;
    /* Grunge texture effect using css mask or shadow if possible, keeping simple for now */
    text-shadow: 4px 4px 0px rgba(0,0,0,0.5);
}

.banner-desc {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #f0f0f0;
    max-width: 800px;
    margin: 0 auto;
    font-weight: 400;
}

@media (max-width: 768px) {
    .banner-title {
        font-size: 3.5rem;
    }
    .event-card, .event-media, .event-media img {
        min-height: 300px;
        height: 300px;
    }
}

/* Premium Frame Styles */
.event-frame-wrapper {
    background: #ffffff;
    border-radius: 0; 
    padding: 0;
    position: relative;
    overflow: hidden;
    
    /* Full Gradient Border */
    border: 4px solid transparent;
    background: 
        linear-gradient(#ffffff, #ffffff) padding-box,
        linear-gradient(90deg, #0088cc, #ffd700, #0088cc) border-box;
}
</style>