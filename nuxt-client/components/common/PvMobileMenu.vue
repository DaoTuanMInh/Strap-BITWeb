<template>
	<div>
		<div
			class="mobile-menu-overlay"
			@click="hideMobileMenu"
		></div>

		<div class="mobile-menu-container">
			<div class="mobile-menu-wrapper">
				<span
					class="mobile-menu-close"
					@click="hideMobileMenu"
				>
					<i class="fa fa-times"></i>
				</span>

				<nav class="mobile-nav">
					<ul class="mobile-menu" @click="handleMenuClick">
                        <li v-for="item in menuItems" :key="item.id">
                             <!-- Scrolling Link (Anchor) -->
                            <template v-if="item.type === 'scroll'">
                                <a 
                                    v-if="$route.path === '/'" 
                                    href="javascript:;" 
                                    @click="handleScroll(item.url)"
                                >
                                    {{ item.label }}
                                </a>
                                <nuxt-link 
                                    v-else 
                                    :to="{ path: '/', hash: item.url }"
                                >
                                    {{ item.label }}
                                </nuxt-link>
                            </template>
                            <!-- Normal Nuxt Link -->
                            <template v-else>
                                <a 
                                    v-if="item.url === '/' && $route.path === '/'" 
                                    href="javascript:;" 
                                    @click="handleScroll('body')"
                                >
                                    {{ item.label }}
                                </a>
                                <nuxt-link
                                    v-else
                                    :to="item.url"
                                >
                                    {{ item.label }}
                                </nuxt-link>
                            </template>
                        </li>
					</ul>

				</nav>

                <div class="d-flex justify-content-center mt-4 pb-4">
                    <a href="javascript:;" class="btn btn-primary btn-round font-weight-bold text-white px-5 py-3" @click="openRecruitmentModal">
                        ĐĂNG KÝ THÀNH VIÊN
                    </a>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
        ...mapState(['menuItems', 'footer']),
        socialLinks() {
            return this.footer?.social_links || [];
        }
    },
	methods: {
		hideMobileMenu: function () {
			document.body.classList.remove( 'mmenu-active' );
            document.documentElement.classList.remove( 'mmenu-active' );
		},
        openRecruitmentModal: function() {
            this.hideMobileMenu();
            this.$root.$emit('show-recruitment-modal');
        },
        handleScroll: function (selector) {
            this.hideMobileMenu();
            // Use requestAnimationFrame to ensure class removal is processed before scrolling
            window.requestAnimationFrame(() => {
                setTimeout(() => {
                    if (selector === 'body') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        try {
                            const target = document.querySelector(selector);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth' });
                            }
                        } catch (e) {
                            console.error('Invalid selector:', selector);
                        }
                    }
                }, 100);
            });
        },
        handleMenuClick: function(e) {
            if (e.target.closest('a')) {
                this.hideMobileMenu();
            }
        }
	}
};
</script>
