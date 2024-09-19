import Separador from "@/app/components/Separador";
import Entrada from "@/app/components/Entrada";
import styles from "@/styles/Login.module.css";

export const metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <div className={styles.container}>
      <Separador>LOGIN</Separador>

      <form className={styles.form}>
        <div className={styles.entradas}>
          <Entrada nome='usuario'>EMAIL OU CNPJ</Entrada>
          <Entrada nome='senha' tipo='password'>SENHA</Entrada>
        </div>

        <Separador tipo='submit'>ENTRAR</Separador>
      </form>

      <div className={styles.cadastroContainer}>
        <div className={styles.cadastro}>
          <Separador tipo='button'>CADASTRAR</Separador>
        </div>
      </div>
    </div>
  );
}