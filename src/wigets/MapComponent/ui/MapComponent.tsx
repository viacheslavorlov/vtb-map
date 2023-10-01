/// <reference path="../../../ymaps.d.ts" />
import {memo, useEffect, useState} from 'react';
import cls from './MapComponent.module.css';

interface MapComponentProps {
    className?: string;
}

export const MapComponent = memo((props: MapComponentProps) => {
    const {
        className
    } = props;
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                function (error) {
                    console.log('Ошибка при получении геолокации:', error);
                }
            );
        } else {
            console.log('Геолокация не поддерживается вашим браузером.');
        }
    }, []); // Пустой массив зависимостей, чтобы эффект выполнился только один раз при монтировании компонента

    useEffect(() => {
        if (latitude && longitude) {
            initMap().catch(() => alert('карта не смогла загрузиться'));
        }
    }, [latitude, longitude]);
    const balloonContent = "<span className={cls.currentPosition}>Вы</span>";

    const initMap = async () => {
        try {
            // @ts-ignore
            await ymaps.ready();
            const map = await new ymaps.Map('map', {
                center: [latitude, longitude],
                controls: ['geolocationControl', 'searchControl', 'fullscreenControl'],
                zoom: 7
            });
            const currentPosition = await new ymaps.Placemark([latitude, longitude], {
                iconContent: `
                    <div style="font-weight: 600; font-size: 12px; background: var(--balloon-bg); border-radius: 15px; height: 100%;">${balloonContent}</div>
                `,

            }, {
                balloonShadow: true,
                iconContentOffset: [0, -10]
            });

           await map.geoObjects.add(currentPosition);
           currentPosition.open()
        } catch (error) {
            console.log('Ошибка при инициализации карты:', error);
        }
    };

    return (
        <div className={cls.MapComponent}>
            <div id={'map'} className={cls.map}></div>
            <div
                // с библиотекой для реакта
            >
                {/*<YMaps>*/}
                {/*    <Map*/}
                {/*        className={cls.map}*/}
                {/*        defaultState={{*/}
                {/*            center: [latitude, longitude],*/}
                {/*            zoom: 9,*/}
                {/*            controls: ["zoomControl", "fullscreenControl"],*/}
                {/*        }}*/}
                {/*        modules={["control.ZoomControl", "control.FullscreenControl"]}*/}
                {/*    >*/}
                {/*        <SearchControl options={{provider: 'yandex#map'}}  />*/}
                {/*    </Map>*/}
                {/*</YMaps>*/}
            </div>

        </div>

    );
});
