<template>
	<div class="faq-section container mt-0 mb-5 pb-7">
		<h2 class="text-center mb-3 text-capitalize">{{ sectionTitle }}</h2>
		<div class="divider mx-auto bg-primary mb-5" style="width: 100px; height: 4px;"></div>
		
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="faq-list">
                    <div 
                        class="faq-item" 
                        v-for="(item, index) in displayFaqs" 
                        :key="index"
                        :class="{ 'active': activeIndex === index }"
                    >
                        <div class="faq-question" @click="toggleFaq(index)">
                            <h5>{{ item.question }}</h5>
                            <i class="fas" :class="activeIndex === index ? 'fa-minus' : 'fa-plus'"></i>
                        </div>  
                        <transition name="slide">
                            <div class="faq-answer" v-show="activeIndex === index">
                                <p v-html="item.answer"></p>
                            </div>
                        </transition>       
                    </div>
                </div>

                <div class="text-center mt-4" v-if="faqData.length > visibleCount">
                    <button class="btn btn-outline-primary btn-ellipse btn-md" @click="toggleExpand">
                        {{ isExpanded ? 'Thu gọn' : 'Xem thêm' }}
                        <i class="fas" :class="isExpanded ? 'fa-angle-up' : 'fa-angle-down'"></i>
                    </button>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data: function () {
		return {
            activeIndex: null,
            isExpanded: false,
            visibleCount: 5
		}
	},
    computed: {
        ...mapState(['homeFaq']),
        faqData() {
            if (!this.homeFaq || !this.homeFaq.content) return [];
            return this.homeFaq.content.map(item => ({
                question: item.Question || item.question,
                answer: item.answer || item.Answer // Handle potential casing differences just in case
            }));
        },
        sectionTitle() {
            return (this.homeFaq && this.homeFaq.title) || 'Các câu hỏi thường gặp';
        },
        displayFaqs() {
            if (this.isExpanded) {
                return this.faqData;
            }
            return this.faqData.slice(0, this.visibleCount);
        }
    },
    methods: {
        toggleFaq(index) {
            if (this.activeIndex === index) {
                this.activeIndex = null;
            } else {
                this.activeIndex = index;
            }
        },
        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        }
    },
    mounted() {
        console.log('PvFaqSection homeFaq:', this.homeFaq);
    }
}
</script>


