<template>
	<div class="member-registry-popup" id="newsletter-popup-form">
		<div class="row m-0 h-100 no-gutters">
			<!-- Left Column: Promotional Content -->
			<div class="col-md-5 p-3 d-flex flex-column justify-content-center align-items-center promo-col text-white text-center">
                <div class="promo-content">
                    <h3 class="font-weight-bold mb-1 text-uppercase ls-n-25" style="font-size: 1.4rem;">{{ promoTitle1 }}</h3>
                    <h2 class="font-weight-extra-bold mb-2 text-uppercase text-warning" style="font-size: 2.4rem; line-height: 1.2;">{{ promoTitle2 }}</h2>
                    
                    <div class="divider mx-auto bg-white mb-2" style="width: 40px; height: 2px; opacity: 0.6;"></div>

                    <h4 class="font-weight-bold mb-1 text-uppercase mt-1" style="font-size: 1.6rem;">{{ promoSubtitle }}</h4>
                    <p class="mb-3 text-white-50" style="font-size: 1.3rem;">{{ promoTagline }}</p>

                    <div class="yellow-badge bg-warning text-dark font-weight-bold px-3 py-1 rounded-pill mb-3 shadow-sm" style="font-size: 1.2rem;">
                        <i class="fas fa-code mr-1"></i>{{ promoBadge }}
                    </div>

                    <div class="student-image-wrapper mt-auto">
                        <!-- Placeholder for student image, can revert to mascot or use empty div if no image -->
                        <img src="~/static/images/mascot.jpg" alt="Student" class="rounded-circle shadow-lg border-white" style="width: 100px; height: 100px; object-fit: cover; border: 3px solid #fff;">
                    </div>
                </div>
			</div>

			<!-- Right Column: Form -->
			<div class="col-md-7 p-0 form-col bg-white">
				<div class="form-wrapper p-3 h-100 d-flex flex-column justify-content-center">
                    <div class="text-right">
                        <!-- Close button is absolute, but spaced here to avoid overlap -->
                    </div>

					<h3 class="form-title font-weight-bold mb-3 text-center text-primary text-uppercase" style="font-size: 2.2rem;">{{ formTitle }}</h3>
					
					<form @submit.prevent="submitForm">
                        <div v-if="success" class="alert alert-success">
                            {{ successMessage }}
                        </div>
                        <div v-if="error" class="alert alert-danger">
                            {{ error }}
                        </div>

						<div class="form-group mb-2">
                            <label class="font-weight-bold text-dark mb-1" style="font-size: 1.4rem;">{{ fullnameLabel }} <span class="text-danger">*</span></label>
							<input
								type="text"
								class="form-control form-control-sm bg-light border-0"
								:placeholder="fullnamePlaceholder"
								required
                                style="font-size: 1.4rem; height: 3.5rem;"
                                v-model="form.fullname"
							/>
						</div>

						<div class="form-group mb-2">
                            <label class="font-weight-bold text-dark mb-1" style="font-size: 1.4rem;">{{ emailLabel }} <span class="text-danger">*</span></label>
							<input
								type="email"
								class="form-control form-control-sm bg-light border-0"
								:placeholder="emailPlaceholder"
								required
                                style="font-size: 1.4rem; height: 3.5rem;"
                                v-model="form.email"
							/>
						</div>

						<div class="form-group mb-2">
                            <label class="font-weight-bold text-dark mb-1" style="font-size: 1.4rem;">{{ phoneLabel }} <span class="text-danger">*</span></label>
							<input
								type="tel"
								class="form-control form-control-sm bg-light border-0"
								:placeholder="phonePlaceholder"
								required
                                style="font-size: 1.4rem; height: 3.5rem;"
                                v-model="form.phone"
							/>
						</div>

						<div class="form-group mb-3">
                            <label class="font-weight-bold text-dark mb-1" style="font-size: 1.4rem;">{{ reasonLabel }}</label>
							<textarea
								class="form-control form-control-sm bg-light border-0"
								:placeholder="reasonPlaceholder"
								required
								rows="2"
                                style="font-size: 1.4rem;"
                                v-model="form.reason"
							></textarea>
						</div>

						<div class="action-buttons">
							<button
								type="submit"
								class="btn btn-block btn-primary font-weight-bold text-uppercase shadow-sm border-0"
                                style="border-radius: 6px; font-size: 1.5rem; padding: 1rem;"
							>
								{{ loading ? loadingText : submitButtonText }}
							</button>
						</div>

					</form>
				</div>
			</div>
		</div>

		<button
			title="Close (Esc)"
			type="button"
			class="mfp-close text-dark"
			@click="$emit('close')"
            style="font-size: 2.5rem; font-weight: 300; top: 10px; right: 10px; opacity: 0.6;"
		>×</button>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { setCookie } from '~/utils/index';
// import Api, { baseUrl } from '~/api';

export default {
    data() {
        return {
            form: {
                fullname: '',
                email: '',
                phone: '',
                reason: ''
            },
            loading: false,
            error: null,
            success: false
        };
    },
    computed: {
        ...mapState(['memberRegisterForm']),
        // Dynamic text properties with fallbacks
        promoTitle1() { return this.memberRegisterForm?.promo_title_1 || ''; },
        promoTitle2() { return this.memberRegisterForm?.promo_title_2 || ''; },
        promoSubtitle() { return this.memberRegisterForm?.promo_subtitle || ''; },
        promoTagline() { return this.memberRegisterForm?.promo_tagline || ''; },
        promoBadge() { return this.memberRegisterForm?.promo_badge || ''; },
        formTitle() { return this.memberRegisterForm?.form_title || ''; },
        fullnameLabel() { return this.memberRegisterForm?.fullname_label || ''; },
        fullnamePlaceholder() { return this.memberRegisterForm?.fullname_placeholder || ''; },
        emailLabel() { return this.memberRegisterForm?.email_label || ''; },
        emailPlaceholder() { return this.memberRegisterForm?.email_placeholder || ''; },
        phoneLabel() { return this.memberRegisterForm?.phone_label || ''; },
        phonePlaceholder() { return this.memberRegisterForm?.phone_placeholder || ''; },
        reasonLabel() { return this.memberRegisterForm?.reason_label || ''; },
        reasonPlaceholder() { return this.memberRegisterForm?.reason_placeholder || ''; },
        submitButtonText() { return this.memberRegisterForm?.submit_button || ''; },
        loadingText() { return this.memberRegisterForm?.loading_text || ''; },
        successMessage() { return this.memberRegisterForm?.success_message || ''; },
        errorMessage() { return this.memberRegisterForm?.error_message || ''; }
    },
	methods: {
		removeNewsletter: function ( e ) {
			setCookie( 'newsletter', !e.target.checked );
		},
        async submitForm() {
            this.loading = true;
            this.error = null;
            this.success = false;

            try {
                // Strapi backend functionality for 'candidates' has been removed per user request.
                // Just simulating success for now or logging.
                console.log('Form submitted:', this.form);

                await this.$axios.post('/candidates', this.form);

                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.success = true;
                this.form = { fullname: '', email: '', phone: '', reason: '' };
                
                // Close modal after success (optional delay)
                setTimeout(() => {
                    this.$emit('close');
                }, 2000);

            } catch (err) {
                console.error('Error submitting form:', err);
                this.error = this.errorMessage;
            } finally {
                this.loading = false;
            }
        }
	}
}
</script>


