import axios from 'axios';
import { CLOUDINARY_CONFIG } from '../../../shared/constants/cloudinary.js';

export const uploadImage = async (file) => {
    try {
        // Validar tipo de archivo
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!CLOUDINARY_CONFIG.ALLOWED_FORMATS.includes(fileExtension)) {
            return {
                success: false,
                error: `Formato no permitido. Use: ${CLOUDINARY_CONFIG.ALLOWED_FORMATS.join(', ')}`
            };
        }

        // Validar tamaño
        if (file.size > CLOUDINARY_CONFIG.MAX_FILE_SIZE) {
            return {
                success: false,
                error: `El archivo es demasiado grande. Máximo ${CLOUDINARY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`
            };
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
        formData.append('cloud_name', CLOUDINARY_CONFIG.CLOUD_NAME);

        const response = await axios.post(CLOUDINARY_CONFIG.UPLOAD_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return {
            success: true,
            url: response.data.secure_url,
            publicId: response.data.public_id,
            width: response.data.width,
            height: response.data.height,
            format: response.data.format
        };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return {
            success: false,
            error: error.response?.data?.error?.message || 'Error al subir la imagen'
        };
    }
};

export const getTransformedImageUrl = (imageUrl, transformation) => {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
        return imageUrl;
    }

    const transformationString = CLOUDINARY_CONFIG.TRANSFORMATIONS[transformation];
    if (!transformationString) {
        return imageUrl;
    }

    return imageUrl.replace('/upload/', `/upload/${transformationString}/`);
};