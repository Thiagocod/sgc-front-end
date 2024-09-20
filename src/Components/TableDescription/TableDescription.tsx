import './Styles.scss'
import Table from 'react-bootstrap/Table'

const TableDescription: React.FC = () =>{
    return(
        <div id="tableDescription">
            <Table>
                <tr>
                    <th className='thTitle'>Produto:</th>
                    <th className='thValor'>Achocolatado</th>
                </tr>
                <tr>
                    <th className='thTitle'>Marca:</th>
                    <th className='thValor'>Nestle</th>
                </tr>
                <tr>
                    <th className='thTitle'>Peso:</th>
                    <th className='thValor'>200g</th>
                </tr>
                <tr>
                    <th className='thTitle'>Mercado:</th>
                    <th className='thValor'>Jacomar Guatupê</th>
                </tr>
                <tr>
                    <th className='thTitle'>Endereço:</th>
                    <th className='thValor'>Miguel Teixeira Franco, 280, São José dos Pinhais - PR</th>
                </tr>
            </Table>
        </div>
    )
}
export default TableDescription