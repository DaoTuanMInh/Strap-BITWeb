<template>
    <main class="main achievement-page">
        <!-- Hero Section -->
        <div class="page-header page-header-bg text-left position-relative" style="background-color: #f4f4f4; min-height: 350px; display: flex; align-items: center;">
            <div class="page-header-bg-image" :style="`background-image: url('${bannerBgImage}'); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; opacity: 0.1;`"></div>
            <div class="container text-center position-relative z-index-1">
                <h2 class="text-capitalize text-dark font-weight-bold mb-2" style="font-size: 3.5rem; letter-spacing: -1px;">{{ pageTitle }}</h2>
                <p class="lead text-dark font-weight-medium mb-0" style="font-size: 1.6rem; max-width: 800px; margin: 0 auto;">{{ pageDesc }}</p>
                <div class="divider mx-auto bg-primary mt-4" style="width: 80px; height: 4px;"></div>
            </div>
        </div>

        <nav aria-label="breadcrumb" class="breadcrumb-nav mb-5">
            <div class="container">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <nuxt-link to="/">Trang Chủ</nuxt-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{ pageTitle }}</li>
                </ol>
            </div>
        </nav>

        <div class="container mb-5 pb-5">
            <div class="timeline">
                <div class="timeline-row" v-for="(item, index) in timeline" :key="index">
                    <div class="timeline-time font-weight-bold text-primary">
                        {{ item.year }}
                    </div>
                    <div class="timeline-content rounded-lg shadow-sm bg-white p-4 p-lg-5 position-relative">
                        <div class="icon-circle bg-primary text-white">
                            <i class="fas fa-history"></i>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-md-5 mb-4 mb-md-0" :class="{ 'order-md-2 pl-md-5': index % 2 === 0, 'pr-md-5': index % 2 !== 0 }">
                                <figure class="mb-0 rounded overflow-hidden shadow-sm hover-scale">
                                    <img 
                                        v-if="item.image"
                                        :src="baseUrl + item.image.url" 
                                        :alt="item.title" 
                                        class="w-100 object-cover" 
                                        style="min-height: 200px; max-height: 300px;"
                                    >
                                </figure>
                            </div>
                            <div class="col-md-7" :class="{ 'order-md-1': index % 2 === 0 }">
                                <h3 class="font-weight-bold mb-3 text-dark timeline-title">{{ item.title }}</h3>
                                <p class="text-body mb-0" style="font-size: 1.5rem; line-height: 1.6;">{{ item.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/api';

export default {
    data() {
        return {
            baseUrl: baseUrl
        }
    },
    computed: {
        ...mapState(['homeAchievement']),
        pageTitle() {
            return (this.homeAchievement && this.homeAchievement.banner && this.homeAchievement.banner.title) || '';
        },
        pageDesc() {
            return (this.homeAchievement && this.homeAchievement.banner && this.homeAchievement.banner.description) || '';
        },
        bannerBgImage() {
            if (this.homeAchievement && this.homeAchievement.banner && this.homeAchievement.banner.background_image) {
                return `${this.baseUrl}${this.homeAchievement.banner.background_image.url}`;
            }
            return '/images/banners/banner-fashion-1.jpg';
        },
        timeline() {
            if (!this.homeAchievement || !this.homeAchievement.timeline) return [];
            return this.homeAchievement.timeline;
        }
    }
}
</script>


