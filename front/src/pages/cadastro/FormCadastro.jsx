import {Input} from "../../components/inputs/Input";
import {useState} from "react";
import {ButtonGradient} from "../../components/buttons/ButtonGradient";
import {handleCadastro} from "../../handles/usuario/handleCadastro";
import {useNavigate} from "react-router-dom";

export function FormCadastro() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confsenha, setConfSenha] = useState("")

    const navigate = useNavigate()

    const cadastrar = async () => {
        let dadosUsuario = {nome, email, senha, confsenha}
        await handleCadastro(dadosUsuario, navigate)
    }

    return (
        <div className="card-body">
            <form>
                <Input label={"Nome"}
                       value={nome}
                       setValue={setNome}
                       placeholder={"Informe seu nome"}/>

                <Input label={"E-mail"}
                       type={"email"}
                       value={email}
                       setValue={setEmail}
                       placeholder={"Informe seu e-mail"}/>

                <Input label={"Senha"}
                       type={"password"}
                       value={senha}
                       setValue={setSenha}
                       placeholder={"Informe sua senha."}/>

                <Input label={"Confirmar Senha"}
                       type={"password"}
                       value={confsenha}
                       setValue={setConfSenha}
                       erro={senha !== confsenha ? "As senhas não conferem." : null}
                       placeholder={"Informe sua senha."}/>

                <ButtonGradient onClick={cadastrar}>
                    Cadastrar
                </ButtonGradient>
            </form>
        </div>
    )
}