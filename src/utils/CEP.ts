export interface SetAddress {
    CEP: string;
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
    region: string;
}

export const CEP = async (CEP: string): Promise<SetAddress | null> => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert('CEP não encontrado.');
            return null;
        } else {
            const { logradouro, complemento, bairro, localidade, uf } = data;
            return {
                CEP,
                street: logradouro,
                complement: complemento,
                neighborhood: bairro,
                city: localidade,
                region: uf
            };
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        alert('Ocorreu um erro ao consultar o CEP. Tente novamente mais tarde.');
        return null;
    }
};