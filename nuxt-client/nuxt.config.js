export default {
    head: {
        titleTemplate: 'BIT CLUB - BTEC Information Technology Club',
        title: 'BIT CLUB - BTEC Information Technology Club',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'BIT CLUB - The official Information Technology Club of BTEC FPT Danang.'
            },
            {
                name: 'author',
                content: 'BIT CLUB'
            },
            {
                name: 'keywords',
                content: 'BIT CLUB, BTEC FPT, IT Club, Danang'
            },
            {
                name: 'app-mobile-web-app-title',
                content: 'Porto'
            },
            {
                name: 'application-name',
                content: 'BIT CLUB Website',
            },
            {
                name: 'msapplication-TileColor',
                content: '#cc9966'
            },
            {
                name: 'msapplication-config',
                content: '/images/icons/browserconfig.xml'
            }
        ],
        link: [
            {
                rel: 'dns-prefetch',
                href: "//fonts.googleapis.com"
            },
            {
                rel: 'manifest',
                href: '/manifest.json'
            },
            {
                hid: 'icon-32',
                rel: 'icon',
                type: 'image/jpeg',
                sizes: '32x32',
                href: '/images/home/banners/logobit.jpg?v=5'
            },
            {
                hid: 'icon-16',
                rel: 'icon',
                type: 'image/jpeg',
                sizes: '16x16',
                href: '/images/home/banners/logobit.jpg?v=5'
            },
            {
                hid: 'shortcut-icon',
                rel: 'shortcut icon',
                href: '/images/home/banners/logobit.jpg?v=5'
            },
            {
                hid: 'apple-touch-icon',
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/images/home/banners/logobit.jpg?v=5'
            },
            {
                rel: 'mask-icon',
                color: '#666666',
                href:
                    './images/icons/safari-pinned-tab.svg'
            },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800%7CPoppins:300,400,500,600,700'
            }
        ]
    },

    css: [
        'swiper/dist/css/swiper.css',
        '~/static/css/animate.min.css',
        '~/static/css/bootstrap.min.css',
        '~/static/css/porto-icons.min.css',
        '~/static/vendor/fontawesome-free/css/all.min.css',
        '~/static/vendor/simple-line-icons/css/simple-line-icons.min.css',
        '~/static/sass/style.scss'
    ],

    plugins: [
        { src: '~/plugins/axios-dynamic.js', ssr: false },
        { src: '~/plugins', ssr: false },

        { src: '~/plugins/directives/animate.js', ssr: false },
        { src: '~/plugins/directives/sticky.js', ssr: false },
        { src: '~/plugins/directives/scroll-to.js', ssr: false }
    ],

    buildModules: [
        '@nuxtjs/style-resources',
        'cookie-universal-nuxt'
    ],

    modules: ['@nuxtjs/axios'],

    axios: {
        baseURL: 'http://localhost:1337'
    },


    router: {
        base: '/',
        linkActiveClass: '',
        linkExactActiveClass: 'active'
    },

    build: {
    },

    generate: {
        subFolders: false,
        fallback: '404.html'
    },

    ssr: false,
    loading: false,
    loadingIndicator: false,

    pageTransition: 'page',

    server: {
        port: 4000,
        host: '0.0.0.0'
    }
};
