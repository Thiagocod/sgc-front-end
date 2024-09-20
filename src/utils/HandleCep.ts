import { FormEvent } from 'react';
import { CEP } from './CEP';

interface Address {
    street: string;
    city: string;
    region: string;
    neighborhood: string;
}

interface HandleCepParams {
    cep: string;
    setAddress: (street: string) => void;
    setCity: (city: string) => void;
    setRegion: (region: string) => void;
    setNeighborhood: (neighborhood: string) => void;
    setIsInputDisabled: (disabled: boolean) => void;
}

export const HandleCep = async (event: FormEvent, params: HandleCepParams) => {
    const { cep, setAddress, setCity, setRegion, setNeighborhood, setIsInputDisabled} = params;
    const getCEP: Address | null = await CEP(cep);
    if (getCEP != null) {
        setAddress(getCEP.street);
        setCity(getCEP.city);
        setRegion(getCEP.region);
        setNeighborhood(getCEP.neighborhood);
        setIsInputDisabled(true);
    } else {
        setIsInputDisabled(false);
    }
};

