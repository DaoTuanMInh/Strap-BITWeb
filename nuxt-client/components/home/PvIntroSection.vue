<template>
	<pv-carousel
		id="home-slider"
		class="home-slider slide-animate show-nav-hover curve-style dot-inside mb-2 position-relative"
		:options="introSlider"
		v-animate
	>
        <template v-if="homeBanners && homeBanners.length > 0">
            <div 
                v-for="(banner, index) in homeBanners"
                :key="index"
                class="home-slide banner swiper-slide d-flex align-items-center justify-content-center"
            >
                <img
                    v-if="getImageUrl(banner)"
                    class="swiper-lazy slide-bg"
                    :src="getImageUrl(banner)"
                    :alt="banner.alt_text || 'slider image'"
                >
                <div v-else class="text-center p-5">
                    <h2 class="text-uppercase text-dark font-weight-bold">{{ banner.alt_text || 'Banner Image Missing' }}</h2>
                </div>
            </div>
        </template>
        
        <template v-else>
            <div class="home-slide home-slide1 banner swiper-slide">
                <img
                    class="swiper-lazy slide-bg"
                    src="~/static/images/banners/banner-fashion-1.jpg"
                    alt="slider image"
                >
            </div>
            <div class="home-slide home-slide2 banner swiper-slide">
                <img
                    class="swiper-lazy slide-bg"
                    src="~/static/images/banners/banner-fashion-2.jpg"
                    alt="slider image"
                >
            </div>
        </template>
	</pv-carousel>
</template>

<script>
import { mapState } from 'vuex';
import PvCarousel from '~/components/ui/PvCarousel';
import { introSlider } from '~/utils/data/carousel';

import { baseUrl } from '~/api';

export default {
	components: {
		PvCarousel
	},
	data: function () {
		return {
			introSlider: introSlider
		};
	},
    computed: {
        ...mapState(['homeBanners'])
    },
    methods: {
        getImageUrl(banner) {
            if (!banner.image) return '';
            const url = banner.image.url;
            return url.startsWith('http') ? url : `${baseUrl}${url}`;
        }
    }
};
</script>

