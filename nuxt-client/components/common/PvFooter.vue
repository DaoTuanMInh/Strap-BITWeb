<template>
	<footer class="footer" id="footer">
		<div class="footer-middle">
			<div class="container">
				<div class="row">
					<div class="col-lg-4 col-md-6 mb-4 mb-lg-0 mt-3 hidden-sm">
						<nuxt-link to="/" v-scroll-to="'body'" class="d-flex align-items-center mb-3 footer-offset-left">
							<img
                                v-if="logoMain"
								:src="logoMain"
								:alt="logoAlt"
								class="logo-footer m-0"
								style="max-height: 80px;"
							>
                            
							<img
                                v-if="logoSecondary"
								:src="logoSecondary"
								:alt="logoAlt"
								class="logo-footer m-0 ml-3"
								style="max-height: 80px;"
							>
						</nuxt-link>
						<p class="footer-desc footer-offset-left">
							{{ footerDescription }}
						</p>
					</div>

					<div class="col-lg-2 col-md-6 mb-4 mb-lg-0 hidden-sm">
						<div class="widget">
							<h4 class="widget-title">{{ quickLinksTitle }}</h4>
							<ul class="links">
								<li v-for="(link, index) in quickLinks" :key="index">
									<nuxt-link :to="link.url">{{ link.text }}</nuxt-link>
								</li>
							</ul>
						</div>
					</div>

					<div class="col-lg-3 col-md-6 mb-4 mb-lg-0 hidden-sm">
						<div class="widget">
							<h4 class="widget-title">{{ activitiesTitle }}</h4>
							<ul class="links">
								<li v-for="(link, index) in activitiesLinks" :key="index">
									<nuxt-link :to="link.url">{{ link.text }}</nuxt-link>
								</li>
							</ul>
						</div>
					</div>

					<div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
						<div class="widget">
						<h4 class="widget-title">{{ contactTitle }}</h4>
							<ul class="contact-info">
								<li class="contact-item d-flex align-items-center mb-2">
									<div class="contact-icon d-flex align-items-center justify-content-center rounded-circle bg-white text-dark mr-3" style="width: 40px; height: 40px; min-width: 40px;">
										<i class="fas fa-map-marker-alt"></i>
									</div>
									<div class="contact-text">
									<h5 class="mb-1 text-white font-weight-bold" style="font-size: 14px;">{{ addressLabel }}</h5>
									<span class="d-block text-white-50" style="font-size: 13px; line-height: 1.4;">{{ address }}</span>
									</div>
								</li>
								<li class="contact-item d-flex align-items-center mb-2">
									<div class="contact-icon d-flex align-items-center justify-content-center rounded-circle bg-white text-dark mr-3" style="width: 40px; height: 40px; min-width: 40px;">
										<i class="fas fa-envelope"></i>
									</div>
									<div class="contact-text">
									<h5 class="mb-1 text-white font-weight-bold" style="font-size: 14px;">{{ emailLabel }}</h5>
									<a :href="'mailto:' + email" class="d-block text-white-50" style="font-size: 13px;">{{ email }}</a>
									</div>
								</li>
								<li class="contact-item d-flex align-items-center mb-2">
									<div class="contact-icon d-flex align-items-center justify-content-center rounded-circle bg-white text-dark mr-3" style="width: 40px; height: 40px; min-width: 40px;">
										<i class="fas fa-clock"></i>
									</div>
									<div class="contact-text">
									<h5 class="mb-1 text-white font-weight-bold" style="font-size: 14px;">{{ workingHoursLabel }}</h5>
									<span class="d-block text-white-50" style="font-size: 13px; line-height: 1.4;">
										<span v-for="(item, index) in workingHours" :key="index">
											{{ item.day }}: {{ item.hours }}<br v-if="index < workingHours.length - 1">
										</span>
									</span>
									</div>
								</li>
							</ul>

							<h4 class="widget-title mt-2 mb-2" style="font-size: 14px;">{{ socialTitle }}</h4>
						<div class="social-icons">
							<a v-for="(social, index) in socialLinks" :key="index" :href="social.url" class="social-icon" :title="social.platform"><i :class="social.icon"></i></a>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/api';

export default {
    computed: {
        ...mapState(['configLogo', 'footer']),
        logoMain() {
            if (this.configLogo && this.configLogo.footer_logo_1) {
                const url = this.configLogo.footer_logo_1.url;
                return url.startsWith('http') ? url : `${baseUrl}${url}`;
            }
            return null;
        },
        logoSecondary() {
            if (this.configLogo && this.configLogo.footer_logo_2) {
                const url = this.configLogo.footer_logo_2.url;
                return url.startsWith('http') ? url : `${baseUrl}${url}`;
            }
            return null;
        },
        logoAlt() {
            return (this.configLogo && this.configLogo.footer_logo_alt) || '';
        },
        footerDescription() {
            return (this.configLogo && this.configLogo.footer_description) || '';
        },
        // Footer dynamic data
        quickLinksTitle() {
            return this.footer?.quick_links_title || '';
        },
        quickLinks() {
            return this.footer?.quick_links || [];
        },
        activitiesTitle() {
            return this.footer?.activities_title || '';
        },
        activitiesLinks() {
            return this.footer?.activities_links || [];
        },
        contactTitle() {
            return this.footer?.contact_title || '';
        },
        addressLabel() {
            return this.footer?.address_label || '';
        },
        address() {
            return this.footer?.address || '';
        },
        emailLabel() {
            return this.footer?.email_label || '';
        },
        email() {
            return this.footer?.email || '';
        },
        workingHoursLabel() {
            return this.footer?.working_hours_label || '';
        },
        workingHours() {
            return this.footer?.working_hours || [];
        },
        socialTitle() {
            return this.footer?.social_title || '';
        },
        socialLinks() {
            return this.footer?.social_links || [];
        }
    }
};
</script>

