import axios from 'axios';

let baseDonmain = 'http://localhost:1337';
if (typeof window !== 'undefined') {
    baseDonmain = `http://${window.location.hostname}:1337`;
}

export const customHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const baseUrl = `${baseDonmain}`;
export const currentDemo = 38;

export default axios.create({
    baseUrl,
    headers: customHeader
})