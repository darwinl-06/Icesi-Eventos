import axios from 'axios';

const PEXELS_API_KEY = 'vg42MomTv7D1yMlfCY1KU3qCuXPOvI1GkAnrWXq5fnCh5eJP2MpJ9fhd'; 
const PEXELS_API_URL = 'https://api.pexels.com/v1/search';

const getPexelsImage = async (query) => {
    try {
        const response = await axios.get(PEXELS_API_URL, {
            headers: {
                Authorization: PEXELS_API_KEY
            },
            params: {
                query: query,
                per_page: 1
            }
        });

        if (response.data.photos && response.data.photos.length > 0) {
            return response.data.photos[0].src.medium; // O el tamaño que prefieras
        }

        return null;
    } catch (error) {
        console.error('Error al obtener imagen de Pexels:', error);
        return null;
    }
};

export default getPexelsImage;
