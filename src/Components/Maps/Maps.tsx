import React, { useEffect, useRef, useState, useCallback } from "react";
import './styles.scss';
import { useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const Maps: React.FC = () => {
    const query = useQuery();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const initializeMap = useCallback((origin: { lat: any; lng: any; }, destination: { lat: any; lng: any; }) => {
        if (mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: (origin.lat + destination.lat) / 2, lng: (origin.lng + destination.lng) / 2 },
                zoom: 14,
            });

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);

            directionsService.route(
                {
                    origin,
                    destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result) {
                        directionsRenderer.setDirections(result);
                    } else {
                        console.error("Error fetching directions:", result);
                    }
                }
            );
        }
    }, []);

    useEffect(() => {
        setMapLoaded(true); // Agora, o mapLoaded será true por padrão quando o componente for montado.
    }, []);

    useEffect(() => {
        const aLat = parseFloat(query.get('a_lat') || '0');
        const aLng = parseFloat(query.get('a_lng') || '0');
        const bLat = parseFloat(query.get('b_lat') || '0');
        const bLng = parseFloat(query.get('b_lng') || '0');

        if (mapLoaded) {
            const origin = { lat: aLat, lng: aLng };
            const destination = { lat: bLat, lng: bLng };
            initializeMap(origin, destination);
        }
    }, [mapLoaded, query, initializeMap]);

    return (
        <div id="maps">
            <div ref={mapRef} style={{ width: '100%', height: '600px' }} />
        </div>
    );
};

export default Maps;


