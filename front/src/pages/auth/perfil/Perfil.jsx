import {useContext, useEffect, useState} from "react";
import {UsuarioContext} from "../../../context/UsuarioContext";
import {Container} from "../../../components/ui/Container";
import {Card} from "../../../components/cards/Card";
import {Input} from "../../../components/inputs/Input";
import {handleAlterarUsuario} from "../../../handles/usuario/handleAlterarUsuario";

export function Perfil() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const { getUsuario, salvarUsuario } = useContext(UsuarioContext)

    useEffect(() => {
        const usuario = getUsuario();
        if (usuario) {
            setNome(usuario.nome);
            setEmail(usuario.email);
        }
    }, []);

    const handleAlterar = async () => {
        const usuarioAlterado = {
            nome,
            email,
            senha,
            confsenha: confirmarSenha
        }

        await handleAlterarUsuario(usuarioAlterado, salvarUsuario);
    }

    return (
        <Container>
            <div className={"row"}>
                <div className={"col-12 col-md-4"}></div>
                <div className={"col-12 col-md-4"}>
                    <Card title={"Alterar informações"}>
                        <Input
                            label={"Nome"}
                            value={nome}
                            type={"text"}
                            setValue={setNome}
                        />

                        <Input
                            label={"E-mail"}
                            value={email}
                            type={"email"}
                            setValue={setEmail}
                        />

                        <Input
                            label={"Senha"}
                            value={senha}
                            type={"password"}
                            setValue={setSenha}
                        />

                        <Input
                            label={"Confirmar senha"}
                            value={confirmarSenha}
                            type={"password"}
                            setValue={setConfirmarSenha}
                            erro={senha !== confirmarSenha ? "As senhas devem ser idênticas" : ""}
                        />

                        <div className={"d-grid gap-2"}>
                            <button className={"btn btn-primary"}
                                onClick={handleAlterar}>Salvar</button>
                        </div>

                    </Card>
                </div>
            </div>
        </Container>
    )
}