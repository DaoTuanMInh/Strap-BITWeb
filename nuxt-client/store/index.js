export const state = () => ({
    menuItems: [],
    configLogo: null,
    homeBanners: [],
    homeFeatures: [],
    homeAds: [],
    homeIntro: null,
    homeOrientations: [],
    homeEventSection: null,
    homeClassrooms: null,
    homeMembers: null,
    homeFaq: null,
    homeAchievement: null,
    jobPosition: null,
    procedure: null,
    footer: null,
    memberRegisterForm: null
});

export const mutations = {
    SET_MENU_ITEMS(state, items) {
        state.menuItems = items;
    },
    SET_CONFIG_LOGO(state, data) {
        state.configLogo = data;
    },
    SET_HOME_BANNERS(state, items) {
        state.homeBanners = items;
    },
    SET_HOME_FEATURES(state, items) {
        state.homeFeatures = items;
    },
    SET_HOME_ADS(state, items) {
        state.homeAds = items;
    },
    SET_HOME_INTRO(state, item) {
        state.homeIntro = item;
    },
    SET_HOME_ORIENTATIONS(state, items) {
        state.homeOrientations = items;
    },
    SET_HOME_EVENT_SECTION(state, item) {
        state.homeEventSection = item;
    },
    SET_HOME_CLASSROOMS(state, item) {
        state.homeClassrooms = item;
    },
    SET_HOME_MEMBERS(state, items) {
        state.homeMembers = items;
    },
    SET_HOME_FAQ(state, item) {
        state.homeFaq = item;
    },
    SET_HOME_ACHIEVEMENT(state, item) {
        state.homeAchievement = item;
    },
    SET_JOB_POSITION(state, item) {
        state.jobPosition = item;
    },
    SET_PROCEDURE(state, item) {
        state.procedure = item;
    },
    SET_FOOTER(state, item) {
        state.footer = item;
    },
    SET_MEMBER_REGISTER_FORM(state, item) {
        state.memberRegisterForm = item;
    }
};

export const actions = {
    async fetchInitialData({ commit }, { $axios }) {
        console.log('Fetching initial data...');
        const p1 = $axios.$get('/menus?_sort=sort_order:asc').catch(err => {
            console.error('Error fetching menus:', err);
            return [];
        });
        const p3 = $axios.$get('/config-logo').catch(err => {
            console.error('Error fetching config-logo:', err);
            return null;
        });
        const p4 = $axios.$get('/home-banners?_sort=sort_order:asc').catch(err => {
            console.error('Error fetching home-banners:', err);
            return [];
        });
        const p5 = $axios.$get('/home-features?_sort=sort_order:asc').catch(err => {
            console.error('Error fetching home-features:', err);
            return [];
        });
        const p6 = $axios.$get('/ads?_sort=sort_order:asc').catch(err => {
            console.error('Error fetching ads:', err);
            return [];
        });
        const p7 = $axios.$get('/intro-section').catch(err => {
            console.error('Error fetching intro-section:', err);
            return null;
        });
        const p8 = $axios.$get('/orientation-section').catch(err => {
            console.error('Error fetching orientation-section:', err);
            return null;
        });
        const p9 = $axios.$get('/event-section').catch(err => {
            console.error('Error fetching event-section:', err);
            return null;
        });
        const p10 = $axios.$get('/classrooms').catch(err => {
            console.error('Error fetching classrooms:', err);
            return null;
        });
        const p11 = $axios.$get('/member').catch(err => {
            console.error('Error fetching members:', err);
            return null;
        });
        const p12 = $axios.$get('/new-faq').catch(err => {
            console.error('Error fetching new-faq:', err);
            return null;
        });
        const p13 = $axios.$get('/achievement').catch(err => {
            console.error('Error fetching achievement:', err);
            return null;
        });
        const p15 = $axios.$get('/job-position').catch(err => {
            console.error('Error fetching job-position:', err);
            return null;
        });
        const p16 = $axios.$get('/procedure').catch(err => {
            console.error('Error fetching procedure:', err);
            return null;
        });
        const p18 = $axios.$get('/footer').catch(err => {
            console.error('Error fetching footer:', err);
            return null;
        });
        const p19 = $axios.$get('/member-register-form').catch(err => {
            console.error('Error fetching member-register-form:', err);
            return null;
        });

        const [menus, configLogo, homeBanners, homeFeatures, homeAds, intros, orientations, eventSection, classrooms, members, faq, achievement, jobPosition, procedure, footer, memberRegisterForm] = await Promise.all([p1, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p15, p16, p18, p19]);

        commit('SET_MENU_ITEMS', menus);
        commit('SET_CONFIG_LOGO', configLogo);
        commit('SET_HOME_BANNERS', homeBanners);
        commit('SET_HOME_FEATURES', homeFeatures);
        commit('SET_HOME_ADS', homeAds);
        commit('SET_HOME_INTRO', intros);
        commit('SET_HOME_ORIENTATIONS', orientations);
        commit('SET_HOME_EVENT_SECTION', eventSection);
        commit('SET_HOME_CLASSROOMS', classrooms);
        commit('SET_HOME_MEMBERS', members);
        commit('SET_HOME_FAQ', faq);
        commit('SET_HOME_ACHIEVEMENT', achievement);
        commit('SET_JOB_POSITION', jobPosition);
        commit('SET_PROCEDURE', procedure);
        commit('SET_FOOTER', footer);
        commit('SET_MEMBER_REGISTER_FORM', memberRegisterForm);
    }
};
