<template>
	<div class="feature-boxes-container container pt-2 pb-1">
		<div class="row justify-content-center">
            
            <div 
                class="col-sm-6 col-lg-4" 
                v-for="(item, index) in homeFeatures" 
                :key="index"
            >
                <div class="feature-box feature-box-simple text-center">
                    <!-- Scroll Link -->
                    <a 
                        v-if="item.type === 'scroll'" 
                        href="#" 
                        v-scroll-to="item.url" 
                        class="text-dark"
                        @click.prevent
                    >
                        <i :class="item.icon"></i>
                        <div class="feature-box-content p-0">
                            <h3 class="text-capitalize">{{ item.title }}</h3>
                            <h5>{{ item.subtitle }}</h5>
                            <p>{{ item.description }}</p>
                        </div>
                    </a>

                    <!-- Standard Page Link -->
                    <nuxt-link 
                        v-else 
                        :to="item.url" 
                        class="text-dark"
                    >
                        <i :class="item.icon"></i>
                        <div class="feature-box-content p-0">
                            <h3 class="text-capitalize">{{ item.title }}</h3>
                            <h5>{{ item.subtitle }}</h5>
                            <p>{{ item.description }}</p>
                        </div>
                    </nuxt-link>
                </div>
            </div>

		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { serviceSlider } from '~/utils/data/carousel'

export default {
	data: function () {
		return {
			serviceSlider: serviceSlider
		}
	},
    computed: {
        ...mapState(['homeFeatures'])
    }
}
</script>

