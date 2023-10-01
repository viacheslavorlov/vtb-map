import {
    GeolocationControl,
    Map,
    ObjectManager,
    Placemark, SearchControl,
    TypeSelector,
    YMaps,
    ZoomControl
} from '@pbe/react-yandex-maps';
import {memo, useEffect, useState} from 'react';
import cls from './MapComponent2.module.css';

interface MapComponent2Props {
    className?: string;
}

const routes = [
    {
        routeId: "0116ЕАПКИР",
        coordinates: [55.613278, 98.568893]
    },
    {
        routeId: "0306ОТКК",
        coordinates: [59.988772, 78.242669]
    },
    {
        routeId: "0506ЕКТМОМНБ-1",
        coordinates: [54.988772, 73.242669]
    },
    {
        routeId: "3005ВК02ХБЧТИР",
        coordinates: [50.987747, 111.51267]
    },
    {
        routeId: "0506ПНКЕОТ",
        coordinates: [53.203076, 45.078721]
    },
    {
        routeId: "0506СПАРСД",
        coordinates: [62.554239, 42.803836]
    },
    {
        routeId: "0306СОСПНБ-1",
        coordinates: [54.664566, 55.862206]
    },
    {
        routeId: "0306МВОМ-2",
        coordinates: [55.12085, 38.818627]
    },
    {
        routeId: "0206ОТТК",
        coordinates: [55.331206, 78.44999]
    }
];

export const MapComponent2 = memo((props: MapComponent2Props) => {
    const {
        className
    } = props;

    const [latitude, setLatitude] = useState<null | number>(null);
    const [longitude, setLongitude] = useState<null | number>(null);

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


    return (
        <div className={cls.MapComponent2}>
            <YMaps>
                <Map
                    defaultState={{center: [latitude, longitude] as number[], zoom: 8}}
                    width={'100vw'}

                >{/* @ts-ignore */}
                    <TypeSelector options={{float: 'left'}}/>
                    <GeolocationControl  options={{float: 'right', adjustMapMargin: true}}/>
                    <ZoomControl options={{position: {right: 10, bottom: 30}, zoomStep: 1,}}/>
                    <SearchControl  options={{float: 'right', provider: 'yandex#search', suppressYandexSearch: false}} state={{}}/>
                    <Placemark options={{draggable: false, balloonContent: 'Вы тут!'}}
                               geometry={[latitude, longitude]}/>
                </Map>
            </YMaps>
        </div>
    );
});
