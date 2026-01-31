<template>
	<nav class="main-nav font2">
		<ul class="menu main-menu menu-arrow text-capitalize">
			<li v-for="item in menuItems" :key="item.id">
                <!-- Scrolling Link (Anchor) -->
                <!-- Scrolling Link (Anchor) -->
                <template v-if="item.type === 'scroll'">
                    <a 
                        v-if="$route.path === '/'" 
                        href="javascript:;" 
                        v-scroll-to="item.url"
                    >
                        <i v-if="item.label === 'Liên hệ'" class="fas fa-phone-alt"></i> {{ item.label }}
                    </a>
                    <nuxt-link 
                        v-else 
                        :to="{ path: '/', hash: item.url }"
                    >
                        <i v-if="item.label === 'Liên hệ'" class="fas fa-phone-alt"></i> {{ item.label }}
                    </nuxt-link>
                </template>
                <!-- Normal Nuxt Link -->
                <template v-else>
                    <a 
                        v-if="item.url === '/' && $route.path === '/'" 
                        href="javascript:;" 
                        v-scroll-to="'body'"
                        class="active"
                    >
                        {{ item.label }}
                    </a>
                    <nuxt-link
                        v-else
                        :to="item.url"
                        :class="{ active: isPageItemActived(item.url) }"
                    >
                        {{ item.label }}
                    </nuxt-link>
                </template>
			</li>
		</ul>
	</nav>
</template>
<script>
import { mapState } from 'vuex';

export default {
	computed: {
        ...mapState(['menuItems']),
		isPageItemActived: function () {
			return (url) => {
                if (url === '/') return this.$route.path === '/';
                return this.$route.path.startsWith(url) && url !== '/';
            }
		}
	}
};
</script>