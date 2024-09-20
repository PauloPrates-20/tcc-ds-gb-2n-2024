import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, query, where, or } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
}
const app = initializeApp(firebaseConfig);
const bd = getFirestore(app);

const caminhos = {
    usuarios: 'Usuario',
};

export async function cadastrarUsuario(dadosUsuario) {
    let resposta = { status: true };
    const usuario = {
        cnpj: dadosUsuario.cnpj,
        email: dadosUsuario.email,
        eventos: [],
        nome: dadosUsuario.nome,
        senha: dadosUsuario.senha,
        status: false,
        telefone: dadosUsuario.telefone
    };

    try {
        await addDoc(collection(bd, caminhos.usuarios), usuario);

        resposta.mensagem = `Usuário cadastrado com sucesso.`
    } catch (erro) {
        resposta.status = false;
        resposta.mensagem = `Erro de banco de dados: ${erro}`;
    }

    return resposta;
}

export async function lerUsuarios(email, senha, cnpj) {
    const query = await getDocs(collection(bd, caminhos.usuarios));
    const usuarios = [];
    query.forEach(usuario => {
        usuarios.push(usuario.data());
    })

    return usuarios;
}

export async function logarUsuario(credenciais) {
	const q = query(
		collection(bd, caminhos.usuarios),
		or(
			where('email', '==', credenciais.usuario),
			where('cnpj', '==', credenciais.usuario)
		)
	);
	
	try {
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];

			if (doc.data().senha === credenciais.senha) return {
				status: true,
				mensagem: 'Usuário logado com sucesso',
				usuario: { id: doc.id, data: doc.data}
			}
		}
	} catch (erro) {
		console.error('Falha ao logar usuário: ', erro);
		throw new Error('Falha ao logar usuário');
	}

    return null;
}