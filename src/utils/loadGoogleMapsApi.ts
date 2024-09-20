// utils/loadGoogleMapsApi.ts
export const loadGoogleMapsApi = (apiKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (typeof window !== "undefined" && window.google) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Google Maps API"));
        document.head.appendChild(script);
    });
};
