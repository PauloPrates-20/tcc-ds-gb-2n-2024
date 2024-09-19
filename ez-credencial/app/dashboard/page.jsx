import CardEvento from '@/app/components/CardEvento';
import Separador from '@/app/components/Separador';
import usuario from '@/public/teste-usuario';
import { FaRegPenToSquare } from 'react-icons/fa6'
import styles from "@/styles/Dashboard.module.css";
import CardRelatorio from '@/app/components/CardRelatorio';

export const metadata = {
  title: 'Dashboard',
};

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Separador tipo='button'>Adicionar evento <FaRegPenToSquare /></Separador>

      <div className={styles.listas}>
        {usuario.hasOwnProperty('id') && usuario.eventos.map((evento, index) => (
          <CardEvento key={index} evento={evento} />
        ))}  
      </div>

      <Separador>Relatórios</Separador>
      <div className={styles.listas}>
        {usuario.hasOwnProperty('id') && usuario.relatorios.map((relatorio, index) => (
          <CardRelatorio key={index} titulo={usuario.eventos.find(evento => evento.id === relatorio.evento).nome} />
        ))}
      </div>
    </div>
  );
}
