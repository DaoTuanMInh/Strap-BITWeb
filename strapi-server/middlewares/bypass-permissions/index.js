module.exports = strapi => {
    return {
        initialize() {
            strapi.app.use(async (ctx, next) => {
                // Bypass permissions for specific recruitment endpoints
                if (ctx.request.url === '/recruitment-banner' || ctx.request.url === '/reason') {
                    console.log(`>>> Middleware: Bypassing permissions for ${ctx.request.url}`);
                    // Set a flag to bypass permissions
                    ctx.state.bypass = true;
                }
                await next();
            });
        },
    };
};
