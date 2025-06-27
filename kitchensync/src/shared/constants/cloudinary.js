export const CLOUDINARY_CONFIG = {
    CLOUD_NAME: import.meta.env.VITE_CLOUD_NAME,
    UPLOAD_PRESET: 'kitchen_sync',
    UPLOAD_URL: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,

    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FORMATS: ['jpg', 'jpeg', 'png', 'webp', 'gif'],

    TRANSFORMATIONS: {
        DISH_THUMBNAIL: 'w_200,h_200,c_fill,q_auto,f_auto',
        DISH_CARD: 'w_400,h_300,c_fill,q_auto,f_auto',
        DISH_DETAIL: 'w_800,h_600,c_fill,q_auto,f_auto'
    }
};