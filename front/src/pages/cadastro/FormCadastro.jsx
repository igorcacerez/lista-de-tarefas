import {Input} from "../../components/inputs/Input";
import {useState} from "react";
import {ButtonGradient} from "../../components/buttons/ButtonGradient";

export function FormCadastro() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confsenha, setConfSenha] = useState("")

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

                <ButtonGradient>
                    Cadastrar
                </ButtonGradient>
            </form>
        </div>
    )
}