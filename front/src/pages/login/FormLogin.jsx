import {Input} from "../../components/inputs/Input";
import {useState} from "react";
import {ButtonGradient} from "../../components/buttons/ButtonGradient";

export function FormLogin() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <div className="card-body">
            <form>
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

                <ButtonGradient>
                    Acessar
                </ButtonGradient>
            </form>
        </div>
    )
}