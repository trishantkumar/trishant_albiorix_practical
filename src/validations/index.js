import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

function loadLocale(code) {
    return import(`vee-validate/dist/locale/${code}.json`).then(locale => {
        localize(code, locale);
    });
}
// Set default language
loadLocale('en');

// Install rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

// Custom rules
extend("required", {
    validate: (value) => {
        if (value === null || value === undefined || value === '') {
            return {
                valid: false
            };
        }

        return {
            valid: value.length >= 0 && value.length <= 120,
        };
    },
    message: '{_field_} is required'
});

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);