<template>
    <div class="main error-page">
        <div class="error-container">
            <div class="container py-5">
                <div class="row justify-content-center align-items-center min-vh-70">
                    <div class="col-lg-6 text-center">
                        <!-- Error Code with Tech Style -->
                        <div class="error-code mb-4">
                            <h1 class="display-1 font-weight-bold text-gradient mb-0">{{ errorCode }}</h1>
                            <div class="error-line"></div>
                        </div>

                        <!-- Error Icon -->
                        <div class="error-icon mb-4">
                            <i class="fas fa-exclamation-triangle text-warning"></i>
                        </div>

                        <!-- Error Message -->
                        <h2 class="font-weight-bold text-dark mb-3">{{ errorTitle }}</h2>
                        <p class="lead text-muted mb-5">{{ errorMessage }}</p>

                        <!-- Action Buttons -->
                        <div class="error-actions">
                            <nuxt-link 
                                to="/" 
                                class="btn btn-primary btn-lg px-5 mr-3 mb-3 shadow-hover"
                            >
                                <i class="fas fa-home mr-2"></i>
                                Về Trang Chủ
                            </nuxt-link>
                            <button 
                                @click="goBack" 
                                class="btn btn-outline-primary btn-lg px-5 mb-3"
                            >
                                <i class="fas fa-arrow-left mr-2"></i>
                                Quay Lại
                            </button>
                        </div>

                        <!-- Quick Links -->
                        <div class="quick-links mt-5">
                            <p class="text-uppercase text-muted font-weight-bold mb-3" style="font-size: 0.9rem;">Liên kết hữu ích</p>
                            <div class="d-flex justify-content-center flex-wrap">
                                <nuxt-link to="/" class="quick-link mx-3 mb-2">Trang Chủ</nuxt-link>
                                <nuxt-link to="/thanh-tuu" class="quick-link mx-3 mb-2">Thành Tựu</nuxt-link>
                                <nuxt-link to="/tuyen-thanh-vien" class="quick-link mx-3 mb-2">Tuyển Thành Viên</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Background Decoration -->
        <div class="bg-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
    computed: {
        errorCode() {
            return this.error?.statusCode || 404;
        },
        errorTitle() {
            if (this.errorCode === 404) {
                return 'Trang Không Tồn Tại';
            }
            return 'Đã Xảy Ra Lỗi';
        },
        errorMessage() {
            if (this.errorCode === 404) {
                return 'Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.';
            }
            return this.error?.message || 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.';
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

