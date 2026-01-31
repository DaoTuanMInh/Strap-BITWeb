'use strict';

module.exports = {
    async find(ctx) {
        try {
            const entity = await strapi.services['footer'].find();
            return entity;
        } catch (err) {
            return ctx.badRequest('Error fetching footer', { error: err.message });
        }
    },
};
