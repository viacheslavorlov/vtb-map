import cls from './MapComponent.module.css';
import {memo, useEffect, useState} from 'react';

interface MapComponentProps {
    className?: string;
}

export const MapComponent = memo((props: MapComponentProps) => {
    const {
        className
    } = props;
    const [latitude, setLatitude] = useState<null | number>(null);
    const [longitude, setLongitude] = useState<null | number>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                function(error) {
                    console.log('Ошибка при получении геолокации:', error);
                }
            );
        } else {
            console.log('Геолокация не поддерживается вашим браузером.');
        }
    }, []); // Пустой массив зависимостей, чтобы эффект выполнился только один раз при монтировании компонента

    useEffect(() => {
        if (latitude && longitude) {
            initMap().catch(() => alert('карта не смогла загрузиться'))
        }
    }, [latitude, longitude]);

    const initMap = async () => {
        try {
            await ymaps.ready();
            const myMap = await new ymaps.Map('map', {
                center: [latitude, longitude],
                zoom: 7
            });
        } catch (error) {
            console.log('Ошибка при инициализации карты:', error);
        }
    };

    return (
        <div id="map" className={cls.map}></div>
    );
});
