export default function ({ $axios }) {
    if (process.client) {
        const port = 1337;
        const host = window.location.hostname;
        const protocol = 'http';
        $axios.setBaseURL(`${protocol}://${host}:${port}`);
    }
}
