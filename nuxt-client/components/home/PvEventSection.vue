<template>
	<div id="events-section" class="product-widgets-container row pb-2">
		<div class="col-12 mb-0">
			<h2 class="section-title text-center text-uppercase font-weight-bold mb-3" style="font-size: 3.5rem;">{{ sectionTitle }}</h2>
			<div class="divider mx-auto bg-primary mb-3" style="width: 100px; height: 4px;"></div>
		</div>

		<div
			class="col-12 mb-5"
			v-for="(event, index) in displayEvents"
			:key="index"
		>
			<div class="row align-items-center activity-row" :class="{ 'flex-row-reverse': index % 2 !== 0 }">
				<!-- Image Column -->
				<div class="col-md-6 mb-4 mb-md-0">
					<div class="activity-image-wrapper rounded-lg overflow-hidden shadow-lg position-relative">
						<img v-if="event.image" :src="getImageUrl(event)" :alt="event.title" class="w-100 h-100 object-cover hover-scale" style="min-height: 400px;">
						<div class="overlay-gradient"></div>
					</div>
				</div>

				<!-- Content Column -->
				<div class="col-md-6">
					<div class="activity-content p-4" :class="{ 'text-right': index % 2 !== 0 && false }">
						<h3 class="font-weight-extra-bold text-dark mb-0" style="font-size: 2.8rem; letter-spacing: -1px; line-height: 1.2;">{{ event.title }}</h3>
						<div class="d-inline-block px-4 py-2 bg-light text-primary rounded-pill mb-3 font-weight-bold text-uppercase shadow-sm" style="font-size: 1rem; letter-spacing: 1px;">
							{{ event.subtitle }}
						</div>
						<p class="lead text-dark mb-2 font-primary" style="font-size: 1.6rem; line-height: 1.6;">{{ event.description }}</p>
						
						<div class="highlights bg-white p-4 rounded shadow-sm border-left-theme">
							<h5 class="font-weight-bold text-dark mb-1" style="font-size: 1.5rem;">Hoạt động nổi bật:</h5>
							<ul class="list-unstyled mb-0">
								<li v-for="(highlight, hIndex) in getHighlights(event.highlights)" :key="hIndex" class="mb-1">
									<span class="text-dark font-weight-medium" style="font-size: 1.5rem; line-height: 1.0;">- {{ highlight }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/api';

export default {
	computed: {
        ...mapState(['homeEventSection']),
        displayEvents() {
            if (this.homeEventSection && this.homeEventSection.items) {
                return this.homeEventSection.items;
            }
            return [];
        },
        sectionTitle() {
            if (this.homeEventSection && this.homeEventSection.title) {
                return this.homeEventSection.title;
            }
            return 'Các sự kiện & hoạt động'; // Default fallback until populated
        }
    },
    methods: {
        getImageUrl(event) {
            if (!event.image) return ''; // Placeholder or default
            // Strapi returns full object for media
            // Ensure we handle case where image is just 'url' string (if customized) or object
            const url = event.image.url;
            if (url.startsWith('http')) return url;
            return `${baseUrl}${url}`;
        },
        getHighlights(highlightText) {
            if (!highlightText) return [];
            // Split by newline and filter empty lines
            return highlightText.split('\n').filter(line => line.trim() !== '');
        }
    }
};
</script>

