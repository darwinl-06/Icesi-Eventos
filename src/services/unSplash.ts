import axios from 'axios';

const UNSPLASH_API_KEY = 'YWhmPS6nHUNSwYyPZo9Hpe8FjQhy4TQwnya6H5x_X0I';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

const getUnsplashImage = async (query) => {
    try {
        const response = await axios.get(UNSPLASH_API_URL, {
            headers: {
                Authorization: `Client-ID ${UNSPLASH_API_KEY}`
            },
            params: {
                query: query,
                per_page: 1
            }
        });

        if (response.data.results && response.data.results.length > 0) {
            return response.data.results[0].urls.regular; // O el tamaño que prefieras
        }

        return null;
    } catch (error) {
        console.error('Error al obtener imagen de Unsplash:', error);
        return null;
    }
};

export default getUnsplashImage;
