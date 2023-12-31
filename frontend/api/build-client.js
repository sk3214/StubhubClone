import axios from 'axios';

export default function buildClient({req}) {
    if (typeof window === 'undefined') {
        // Server-side logic
        return axios.create({
        baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: req.headers
        });
    } else {
        // Client-side logic
        return axios.create({
        baseURL: '/'
        });
    }
}
