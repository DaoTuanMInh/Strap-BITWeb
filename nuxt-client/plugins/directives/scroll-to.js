import Vue from 'vue';

Vue.directive('scroll-to', {
    bind: function (el, binding) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSelector = binding.value;
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
