<template>
	<main class="main home-page">
		<pv-intro-section></pv-intro-section>

		<pv-core-values></pv-core-values>
		
		<pv-blog-section :posts="posts"></pv-blog-section>

		<pv-intro-info></pv-intro-info>
<div class="container">
	<pv-event-section></pv-event-section>
</div>
<pv-member-slider></pv-member-slider>
<pv-classroom-list></pv-classroom-list>

        <pv-faq-section></pv-faq-section>



		<light-box
			v-if="lightBoxMedia.length > 0"
			ref="lightBox"
			:media="lightBoxMedia"
			:show-light-box="false"
			class="blog-light-box"
		/>
	</main>
</template>

<script>
import LightBox from 'vue-image-lightbox';
import PvIntroSection from '~/components/home/PvIntroSection';
import PvCoreValues from '~/components/home/PvCoreValues';
import PvMemberSlider from '~/components/home/PvMemberSlider';
import PvClassroomList from '~/components/home/PvClassroomList';
import PvEventSection from '~/components/home/PvEventSection';
import PvBlogSection from '~/components/home/PvBlogSection';
import PvFaqSection from '~/components/home/PvFaqSection';
import PvIntroInfo from '~/components/home/PvIntroInfo';

import { getCookie } from '~/utils';
import Api, { baseUrl } from '~/api';

export default {
	components: {
		LightBox,
		PvIntroSection,
		PvCoreValues,
		PvMemberSlider,
		PvClassroomList,
		PvEventSection,
		PvBlogSection,
		PvIntroInfo,
        PvFaqSection
	},
	data: function () {
		return {
			products: [],
			posts: [],
			timerId: 0
		};
	},
	computed: {
		lightBoxMedia: function () {
			let pictures = [];
			for ( let i = 0; i < this.posts.length; i++ ) {
				pictures.push( this.posts[ i ].picture[ 0 ] );
			}
			return pictures.reduce( ( acc, cur ) => {
				return [
					...acc,
					{
						src: `${ baseUrl }${ cur.url }`,
						thumb: `${ baseUrl }${ cur.url }`
					}
				];
			}, [] );
		}
	},
	mounted: function () {
		Api.get( `${ baseUrl }/demo38` )
			.then( response => {
				this.products = response.data.products;
				this.posts = response.data.posts;
			} )
			.catch( error => ( { error: JSON.stringify( error ) } ) );
	},
	destroyed: function () {
	}
};
</script>

<style>
body {
    background-color: #f9f9f9;
    background-image: radial-gradient(#e6e6e6 1px, transparent 1px);
    background-size: 20px 20px;
}
</style>



