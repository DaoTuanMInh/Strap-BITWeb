<template>
    <main class="main recruitment-page">
        <!-- Banner Section (Achievement Style) -->
        <div class="page-header page-header-bg text-left position-relative" style="background-color: #f4f4f4; min-height: 350px; display: flex; align-items: center;">
            <div class="page-header-bg-image" :style="bannerStyle"></div>
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

        <!-- Departments Section -->
        <div class="container mb-3 pb-3">
            <div class="row justify-content-center mb-5">
                <div class="col-lg-8 text-center">
                    <h2 class="section-title font-weight-bold mb-3">{{ departmentsTitle }}</h2>
                    <p class="text-muted">{{ departmentsDescription }}</p>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-2" v-for="(dept, index) in departments" :key="index">
                    <div class="feature-box feature-box-effect text-center p-2 bg-white rounded-lg shadow-hover h-100">
                        <div class="icon-wrapper mb-1 text-primary">
                            <i :class="dept.icon"></i>
                        </div>
                        <h3 class="font-weight-bold mb-1" style="font-size: 1.8rem;">{{ dept.title }}</h3>
                        <p class="text-body mb-2 text-small">{{ dept.desc }}</p>
                        <ul class="text-left list-unstyled mb-0 pl-3">
                            <li v-for="(item, i) in dept.skills" :key="i" class="mb-0 text-small">
                                - {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recruitment Process -->
        <div class="bg-light py-5 mb-5 process-section">
            <div class="container py-4">
                <h2 class="text-center font-weight-bold mb-5 section-title">{{ processTitle }}</h2>
                <div class="row">
                    <div class="col-md-3 mb-4 text-center process-step" v-for="(step, index) in process" :key="index">
                        <div class="step-icon mb-3 bg-white shadow-sm text-primary">
                            <span>{{ index + 1 }}</span>
                        </div>
                        <h4 class="font-weight-bold mb-2">{{ step.title }}</h4>
                        <p class="text-small text-muted">{{ step.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mb-5 text-center">
             <a href="javascript:;" @click="openModal" class="btn btn-primary btn-ellipse btn-xl shadow-lg font-weight-bold px-5">
                Đăng Ký Thành Viên Ngay
            </a>
        </div>


    </main>
</template>

<script>
import PvMemberRegisterModal from '~/components/modals/PvMemberRegisterModal';
import { mapState } from 'vuex';
import { baseUrl } from '~/api';

export default {
    components: {
        PvMemberRegisterModal
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['jobPosition', 'procedure', 'homeAchievement']),
        baseUrl() {
            return baseUrl;
        },
        recruitmentBanner() {
            // Lấy phần tử đầu tiên từ Banner2 array
            if (this.homeAchievement && this.homeAchievement.Banner2 && this.homeAchievement.Banner2.length > 0) {
                return this.homeAchievement.Banner2[0];
            }
            return null;
        },
        pageTitle() {
            return (this.recruitmentBanner && this.recruitmentBanner.title) || 'Tuyển Thành Viên';
        },
        pageDesc() {
            return (this.recruitmentBanner && this.recruitmentBanner.description) || 'Gia nhập đại gia đình BIT CLUB để cùng nhau học tập, sáng tạo và bứt phá giới hạn bản thân.';
        },
        bannerStyle() {
            let bgUrl = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80';
            if (this.recruitmentBanner && this.recruitmentBanner.background_image) {
                bgUrl = `${baseUrl}${this.recruitmentBanner.background_image.url}`;
            }
            return {
                backgroundImage: `url('${bgUrl}')`,
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: '0.1'
            };
        },

        departments() {
            if (this.jobPosition?.departments && this.jobPosition.departments.length > 0) {
                return this.jobPosition.departments.map(dept => ({
                    ...dept,
                    desc: dept.description, // Map description to desc
                    skills: dept.skills ? dept.skills.split('\n')
                        .map(s => s.replace(/^[-*•]\s*/, '').trim()) // Remove existing bullets and trim
                        .filter(s => s !== '') // Remove empty lines
                        : []
                }));
            }
            return [];
        },
        departmentsTitle() {
            return this.jobPosition?.section_title || '';
        },
        departmentsDescription() {
            return this.jobPosition?.section_description || '';
        },
        process() {
            if (this.procedure?.process && this.procedure.process.length > 0) {
                return this.procedure.process.map(step => ({
                    ...step,
                    desc: step.description // Map description to desc
                }));
            }
            return [];
        },
        processTitle() {
            return this.procedure?.section_title || '';
        },

    },
    mounted() {
        // Auto open modal after 2 seconds
        setTimeout(() => {
            this.openModal();
        }, 2000);
    },
    methods: {
        openModal() {
            this.$modal.show(
                () => import('~/components/modals/PvMemberRegisterModal'),
                {},
                { width: '650', height: 'auto', adaptive: true, class: 'member-registry-modal-wrapper' }
            );
        }
    }
}
</script>


