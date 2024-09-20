import Form from 'react-bootstrap/Form';
import React, {useState}from 'react';
import Button from 'react-bootstrap/Button';

interface CepProps{
    cep: string;
    setCep: typeof useState;
    InputMask : React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    handleCep: React.MouseEventHandler<HTMLButtonElement>;
}

export const CEP = ({cep, setCep, InputMask, handleCep}: CepProps) =>{
    return(
        <>
            <Form.Group className='mb-3' controlId='CEP'>
                <Form.Label> CEP </Form.Label>
                <div id="cepBtn">
                    <Form.Control value={cep} onChange={e => setCep(e.target.value)} type='text' as={InputMask} mask="99999-999" placeholder='00000-000' />
                    <Button onClick={handleCep} variant="secondary">Buscar</Button>
                </div>
            </Form.Group>
        </>
    )
}