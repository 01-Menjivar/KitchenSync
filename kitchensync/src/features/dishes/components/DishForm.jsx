import { useState, useEffect } from "react";
import Input from "../../../shared/ui/Input";
import Select from "../../../shared/ui/Select";
import Button from "../../../shared/ui/Button";
import Checkbox from "../../../shared/ui/Checkbox";
import ImageInput from "../../../shared/ui/ImageInput";
import {areFieldsFilled} from "../../../shared/utils/validate.js";
import {dishCategories} from "../../../shared/constants/dishCategories.js";
import { useDishStore } from "../store";
import { uploadImage } from "../services/cloudinaryService.js";

const DishForm = () => {
    const { 
        editingDish, 
        createDish, 
        updateDish, 
        setFeedback, 
        isSubmittingDish 
    } = useDishStore();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: dishCategories[0].value,
        isAvailable: true,
        imageUrl: ""
    });

    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        if (editingDish) {
            setFormData({ ...editingDish });
        } else {
            setFormData({
                name: "",
                description: "",
                price: "",
                category: dishCategories[0].value,
                isAvailable: true,
                imageUrl: ""
            });
        }
    }, [editingDish]);

       const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price" && Number(value) < 0) {
            setFeedback({
                type: "error",
                message: "El precio no puede ser negativo",
            });
            return;
        }
    
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = async (e) => {
        const { name, value } = e.target;
        if (value instanceof File) {
            setUploadingImage(true);
            try {
                const uploadResult = await uploadImage(value);

                if (uploadResult.success) {
                    setFormData({
                        ...formData,
                        [name]: uploadResult.url
                    });
                    setFeedback({
                        type: "success",
                        message: "Imagen subida correctamente"
                    });
                } else {
                    setFeedback({
                        type: "error",
                        message: uploadResult.error || "Error al subir la imagen"
                    });
                }
            } catch (error) {
                console.log(error)
                setFeedback({
                    type: "error",
                    message: "Error al subir la imagen"
                });
            } finally {
                setUploadingImage(false);
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = {
            ...formData,
            imageUrl: formData.imageUrl
        };

        if (!areFieldsFilled(requiredFields) || !formData.imageUrl) {
            setFeedback({
                type: "error",
                message: "Completa todos los campos y sube una imagen",
            });
            return;
        }

        try {
            if (editingDish) {
                await updateDish(editingDish.id, formData);
            } else {
                await createDish(formData);
            }
        } catch (error) {
            console.error("Error en submit:", error);
        }
    };

    const isFormLoading = isSubmittingDish || uploadingImage;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre del platillo"
                disabled={isFormLoading}
            />
            <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción"
                disabled={isFormLoading}
            />
            <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Precio"
                min="0"
                step="0.01"z
            />
            <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={dishCategories}
                disabled={isFormLoading}
            />
            <Checkbox
                id="isAvailable"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                label="Disponible"
                disabled={isFormLoading}
            />
            <ImageInput
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleImageChange}
                disabled={isFormLoading}
                isUploading={uploadingImage}
            />
            <Button type="submit" disabled={isFormLoading}>
                {uploadingImage ? "Subiendo imagen..." : 
                 isSubmittingDish ? "Guardando..." : 
                 editingDish ? "Actualizar Platillo" : "Crear Platillo"}
            </Button>
        </form>
    );
};

export default DishForm;