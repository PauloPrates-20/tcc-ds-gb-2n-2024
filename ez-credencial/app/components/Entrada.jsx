import styles from "@/styles/Entrada.module.css";

export default function Entrada({ nome, tipo, children, disable }) {
	return (
		<input 
			className={styles.entrada}
			type={tipo ? tipo : 'text'}
			placeholder={children}
			name={nome}
			disabled={disable ? disable : false}
		/>
	);
}