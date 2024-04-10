import React, { useEffect, useState } from 'react';//для управление состоянием и используется в функциональных компонентах React для добавления локального состояния в компонент.
import axios from 'axios'; //получение изображений из апи через unsplash
import LazyImage from './LazyImage';//используются для хранение изображение данных

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/photos', {
                    params: {
                        client_id: 'TZo1VZ1gbZcv_AFtzWJYf5f0NipMJRdahVoi5do1LvI',

                    },
                });
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="image-gallery">
            {images.map((image) => (
                <LazyImage key={image.id} src={image.urls.regular} alt={image.alt_description} />
            ))}
        </div>
    );
};

export default ImageGallery;
