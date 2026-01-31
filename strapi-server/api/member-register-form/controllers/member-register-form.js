'use strict';

module.exports = {
    async find(ctx) {
        try {
            const entity = await strapi.services['member-register-form'].find();
            return entity;
        } catch (err) {
            return ctx.badRequest('Error fetching member register form config', { error: err.message });
        }
    },
};
