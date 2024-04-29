import {Input} from "../../components/inputs/Input";
import {useContext, useState} from "react";
import {ButtonGradient} from "../../components/buttons/ButtonGradient";
import {UsuarioContext} from "../../context/UsuarioContext";
import {useNavigate} from "react-router-dom";
import {handleLogin} from "../../handles/usuario/handleLogin";

export function FormLogin() {
    const {salvarUsuario} = useContext(UsuarioContext)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigate = useNavigate();

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

                <ButtonGradient onClick={() => handleLogin(email, senha, salvarUsuario, navigate)}>
                    Acessar
                </ButtonGradient>
            </form>
        </div>
    )
}