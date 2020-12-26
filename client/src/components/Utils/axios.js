import axios from 'axios';
const baseURL = "http://localhost:9000/api/";

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 10000,
	headers: {
		'auth-token': localStorage.getItem('auth_token'),
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		if (typeof error.response === 'undefined') {
			console.log(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. '
			);
			return Promise.reject(error);
		}

		return Promise.reject(error.response);
	}
);

export default axiosInstance;