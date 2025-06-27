import { useState, useEffect } from "react";
import { IconPhoto, IconUpload, IconLoader } from '@tabler/icons-react';
import {CLOUDINARY_CONFIG} from "../constants/cloudinary.js";

const ImageInput = ({ name, onChange, value, disabled, isUploading = false }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (typeof value === "string"&& value !== "") {
            setPreview(value);
        } else {
            setPreview(null);
        }
    }, [value]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido');
            return;
        }

        if (file.size > CLOUDINARY_CONFIG.MAX_FILE_SIZE) {
            alert(`La imagen debe ser menor a ${CLOUDINARY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        const customEvent = {
            target: {
                name,
                value: file,
                type: "file"
            }
        };
        onChange(customEvent);
    };

    const handleRemoveImage = () => {
        setPreview(null);
        const customEvent = {
            target: {
                name,
                value: "",
                type: "text"
            }
        };
        onChange(customEvent);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Imagen del platillo
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                {preview ? (
                    <div className="space-y-3">
                        <div className="relative w-full max-h-48 overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-auto object-cover"
                            />
                            {isUploading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="flex items-center space-x-2 text-white">
                                        <IconLoader className="animate-spin" size={20} />
                                        <span className="text-sm">Subiendo...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-2">
                            <label
                                htmlFor={`image-upload-${name}`}
                                className="flex-1 cursor-pointer bg-blue-50 border border-blue-300 rounded-lg px-4 py-2 text-blue-700 hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2 text-sm"
                            >
                                <IconUpload size={16} />
                                <span>Cambiar imagen</span>
                            </label>

                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                disabled={disabled || isUploading}
                                className="px-4 py-2 bg-red-50 border border-red-300 rounded-lg text-red-700 hover:bg-red-100 transition-colors text-sm disabled:opacity-50"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ) : (
                    <label
                        htmlFor={`image-upload-${name}`}
                        className="cursor-pointer flex flex-col items-center justify-center py-8 space-y-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <IconPhoto size={48} className="text-gray-400" />
                        <span className="text-sm font-medium">Seleccionar imagen</span>
                        <span className="text-xs text-gray-400">
                            {CLOUDINARY_CONFIG.ALLOWED_FORMATS.join(', ').toUpperCase()} hasta {CLOUDINARY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB
                        </span>
                    </label>
                )}

                <input
                    id={`image-upload-${name}`}
                    type="file"
                    name={name}
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={disabled || isUploading}
                    className="hidden"
                />
            </div>

            {isUploading && (
                <div className="text-sm text-blue-600 flex items-center space-x-2">
                    <IconLoader className="animate-spin" size={16} />
                    <span>Subiendo imagen a nuestros servicios...</span>
                </div>
            )}
        </div>
    );
};

export default ImageInput;