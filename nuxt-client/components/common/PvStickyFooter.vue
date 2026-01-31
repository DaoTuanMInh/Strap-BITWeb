<template>
    <div class="sticky-navbar">
        <div class="sticky-info" v-for="(item, index) in menuItems" :key="index">
            <template v-if="item.type === 'scroll'">
                <a 
                    v-if="$route.path === '/'" 
                    href="javascript:;" 
                    v-scroll-to="item.url"
                >
                    <i :class="getIcon(item.label)"></i>{{ item.label }}
                </a>
                <nuxt-link 
                    v-else 
                    :to="{ path: '/', hash: item.url }"
                >
                    <i :class="getIcon(item.label)"></i>{{ item.label }}
                </nuxt-link>
            </template>
            <template v-else>
                <a 
                    v-if="item.url === '/' && $route.path === '/'" 
                    href="javascript:;" 
                    v-scroll-to="'body'"
                >
                    <i :class="getIcon(item.label)"></i>{{ item.label }}
                </a>
                <nuxt-link
                    v-else
                    :to="item.url"
                >
                    <i :class="getIcon(item.label)"></i>{{ item.label }}
                </nuxt-link>
            </template>
        </div>
        
        <!-- Optional: Keep Search or Account if needed, but user asked to match Navbar content -->
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['menuItems'])
    },
    methods: {
        getIcon(label) {
            const l = label ? label.toLowerCase() : '';
            if (l.includes('trang chủ') || l.includes('home')) return 'icon-home';
            if (l.includes('giới thiệu') || l.includes('about')) return 'icon-info';
            if (l.includes('thành tựu') || l.includes('achievement')) return 'icon-star';
            if (l.includes('tuyển')) return 'icon-pencil';
            if (l.includes('thành viên') || l.includes('member')) return 'icon-users';
            if (l.includes('liên hệ') || l.includes('contact')) return 'icon-phone';
            if (l.includes('sự kiện') || l.includes('event')) return 'icon-calendar';
            if (l.includes('đăng ký') || l.includes('register')) return 'icon-pencil';
            if (l.includes('hoạt động')) return 'icon-mode-grid';
            
            return 'icon-category-home'; // Default icon
        }
    }
}
</script>