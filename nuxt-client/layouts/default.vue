<template>
	<div @click="hideMobileSearch">
		<div class="page-wrapper">
			<pv-header></pv-header>
			<nuxt></nuxt>
			<pv-footer></pv-footer>
		</div>

		<div class="wishlist-popup">
			<div class="wishlist-popup-msg">Product added!</div>
		</div>

		<a
			id="scroll-top"
			href="javascript:;"
			title="Top"
			role="button"
			@click="scrollToTop"
		>
			<i class="icon-angle-up"></i>
		</a>

		<pv-mobile-menu></pv-mobile-menu>

		<pv-sticky-footer></pv-sticky-footer>
	</div>
</template>

<script>
import PvHeader from '~/components/common/PvHeader';
import PvFooter from '~/components/common/PvFooter';
import PvMobileMenu from '~/components/common/PvMobileMenu';
import PvStickyFooter from '~/components/common/PvStickyFooter';
import PvMemberRegisterModal from '~/components/modals/PvMemberRegisterModal';
import {
	scrollTopHandler,
	stickyHeaderHandler,
	resizeHandler,
	showScrollTopHandler,
	scrollTo,
	scrollTop,
    getCookie
} from '~/utils';
import { baseUrl } from '~/api';

export default {
	components: {
		PvHeader,
		PvFooter,
		PvMobileMenu,
		PvStickyFooter,
        PvMemberRegisterModal
	},
    data: function() {
        return {
            timerId: 0
        }
    },
	watch: {
		$route: function () {
			resizeHandler();
			this.$modal.hideAll();
		}
	},
    created: function() {
        this.$root.$on('show-recruitment-modal', this.openRecruitmentModal);
    },
	mounted: function () {
        // Fetch data on client side load
        this.$store.dispatch('fetchInitialData', { $axios: this.$axios });

		window.addEventListener( 'scroll', stickyHeaderHandler, {
			passive: true
		} );
		window.addEventListener( 'scroll', showScrollTopHandler, {
			passive: true
		} );
		window.addEventListener( 'resize', stickyHeaderHandler );
		window.addEventListener( 'resize', resizeHandler );

        // Auto show modal logic (moved from index.vue)
		this.timerId = setTimeout( () => {
			if (
				this.$route.path === '/' &&
				getCookie( 'newsletter' ) !== 'false'
			) {
                this.openRecruitmentModal();
			}
		}, 10000 );
	},
	destroyed: function () {
		window.removeEventListener( 'scroll', showScrollTopHandler, {
			passive: true
		} );
		window.removeEventListener( 'scroll', stickyHeaderHandler, {
			passive: true
		} );
		window.removeEventListener( 'resize', stickyHeaderHandler );
		window.removeEventListener( 'resize', resizeHandler );
        
        clearTimeout( this.timerId );
        this.$root.$off('show-recruitment-modal', this.openRecruitmentModal);
	},
    methods: {
		scrollToTop: function () {
			scrollTop( false, 70 );
		},
		hideMobileSearch: function () {
			if ( document.querySelector( '.header-search' ) ) {
				let headerSearch = document.querySelectorAll( '.header-search' );

				headerSearch.forEach( item => {
					item.classList.remove( 'show' );
					item.querySelector( '.header-search-wrapper' ).classList.remove( 'show' );
				} )
			}
		},
        openRecruitmentModal: function() {
            this.$modal.show(
                () => import('~/components/modals/PvMemberRegisterModal'),
                {},
                { width: '550', height: 'auto', adaptive: true, class: 'member-registry-modal-wrapper' }
            );
        }
	},
    head() {
        const config = this.$store.state.configLogo;
        const title = (config && config.site_title) ? config.site_title : 'Porto - Multi-purpose Ecomerce template with Vue.js';
        
        // Logic to fetch from Strapi enabled
        let faviconUrl = '/images/home/banners/logobit.jpg'; // Default fallback
        if (config && config.site_favicon && config.site_favicon.url) {
            faviconUrl = config.site_favicon.url.startsWith('http') ? config.site_favicon.url : `${baseUrl}${config.site_favicon.url}`;
        }

        return {
            title: title,
            titleTemplate: '%s', // Overwrite default template if needed
            link: [
                { hid: 'icon-32', rel: 'icon', type: 'image/jpeg', href: faviconUrl },
                { hid: 'icon-16', rel: 'icon', type: 'image/jpeg', href: faviconUrl },
                { hid: 'shortcut-icon', rel: 'shortcut icon', href: faviconUrl },
                { hid: 'apple-touch-icon', rel: 'apple-touch-icon', href: faviconUrl }
            ]
        };
    }
};
</script>