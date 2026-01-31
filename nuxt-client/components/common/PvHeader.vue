<template>
	<header class="header">
		<div class="header-middle sticky-header">
			<div class="container">
				<div class="header-left col-lg-2 w-auto pl-0">
					<button
						class="mobile-menu-toggler"
						type="button"
						@click="showMobileMenu"
					>
						<i class="fas fa-bars"></i>
					</button>
					<nuxt-link
						to="/"
						v-scroll-to="'body'"
						class="logo d-flex align-items-center custom-logo-pos"
					>
						<img
                            v-if="logoMain"
							:src="logoMain"
							width="105"
							height="44"
							:alt="logoAlt"
						/>

						<img
                            v-if="logoSecondary"
							:src="logoSecondary"
							width="105"
							height="44"
							:alt="logoAlt"
                            class="ml-2"
						/>
					</nuxt-link>
				</div>

				<div class="header-right">
					<pv-main-menu></pv-main-menu>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import PvMainMenu from '~/components/common/PvMainMenu';
import { baseUrl } from '~/api';

document.querySelector( 'body' ).classList.add( 'loaded' );

export default {
	components: {
		PvMainMenu
	},
    computed: {
        configLogo() {
            return this.$store.state.configLogo;
        },
        logoMain() {
            if (this.configLogo && this.configLogo.header_logo_1) {
                const url = this.configLogo.header_logo_1.url;
                return url.startsWith('http') ? url : `${baseUrl}${url}`;
            }
            return null;
        },
        logoSecondary() {
            if (this.configLogo && this.configLogo.header_logo_2) {
                const url = this.configLogo.header_logo_2.url;
                return url.startsWith('http') ? url : `${baseUrl}${url}`;
            }
            return null;
        },
        logoAlt() {
            return (this.configLogo && this.configLogo.header_logo_alt) || 'Header Logo';
        }
    },
	methods: {
		showMobileMenu: function () {
			document.querySelector( 'body' ).classList.add( 'mmenu-active' );
		}
	}
};
</script>

<style scoped>
.custom-logo-pos {
    margin-left: 15px !important; /* Positive margin for mobile to prevent sticking */
}

@media (min-width: 992px) {
    .custom-logo-pos {
        margin-left: -90px !important; /* Desktop shift */
    }
}
</style>