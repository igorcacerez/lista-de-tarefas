import {Container} from "../../components/ui/Container";
import {useState} from "react";
import {Input} from "../../components/inputs/Input";
import {FormLogin} from "./FormLogin";
import {TxtLoginCadastro} from "../../components/texts/TxtLoginCadastro";

export function Login() {
    return (
        <Container login={true}>
            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                        <h3 className="font-weight-bolder text-info text-gradient">Lista de Tarefas</h3>
                        <p className="mb-0">Acesse o sistema e organize suas atividades.</p>
                    </div>

                    <FormLogin />

                    <TxtLoginCadastro
                        text={"Não possui uma conta? "}
                        txtLnk={"Clique Aqui"}
                        link={"/cadastro"}
                        />
                </div>
            </div>



            <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                         style={{backgroundImage: "url(/assets/img/curved-images/curved6.jpg)"}}></div>
                </div>
            </div>
        </Container>
    )
}