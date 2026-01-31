<template>
	<div
		class="partners-container appear-animate"
		data-animation-name="fadeInUpShorter"
		data-animation-delay="250"
		v-animate
	>
		<pv-carousel
			class="appear-animate"
			data-animation-name="fadeIn"
			data-animation-delay="100"
			:options="brandSlider"
			v-animate
		>
			<!-- Logos removed -->
		</pv-carousel>
	</div>
</template>

<script>
import PvCarousel from '~/components/ui/PvCarousel';
import { brandSlider } from '~/utils/data/carousel';

export default {
	components: {
		PvCarousel
	},
	data: function () {
		return {
			brandSlider: brandSlider
		}
	}
}
</script>