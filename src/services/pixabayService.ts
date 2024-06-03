import axios from 'axios';

const PIXABAY_API_KEY = '44072417-167cb0467f6125c3704412b29'; // Reemplaza esto con tu API key de Pixabay
const PIXABAY_API_URL = 'https://pixabay.com/api/';

const getPixabayImage = async (query) => {
    try {
        const response = await axios.get(PIXABAY_API_URL, {
            params: {
                key: PIXABAY_API_KEY,
                q: query,
                per_page: 1
            }
        });

        if (response.data.hits && response.data.hits.length > 0) {
            return response.data.hits[0].webformatURL; // O el tamaño que prefieras
        }

        return null;
    } catch (error) {
        console.error('Error al obtener imagen de Pixabay:', error);
        return null;
    }
};

export default getPixabayImage;
