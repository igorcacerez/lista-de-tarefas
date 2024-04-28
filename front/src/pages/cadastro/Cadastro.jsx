import {TxtLoginCadastro} from "../../components/texts/TxtLoginCadastro";
import {Container} from "../../components/ui/Container";
import {FormCadastro} from "./FormCadastro";

export function Cadastro() {
    return (
        <Container login={true}>
            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-1">
                    <div className="card-header pb-0 text-left bg-transparent">
                        <h2 className="font-weight-bolder text-info text-gradient pb-4">Lista de Tarefas</h2>
                        <h4 className="font-weight-bolder mb-0 pb-0">Cadastre-se grátis</h4>
                        <p className="mb-0 mt-0 pt-o">Preencha os dados abaixo corretamente.</p>
                    </div>

                    <FormCadastro/>

                    <TxtLoginCadastro
                        text={"Já possui uma conta? "}
                        txtLnk={"Clique Aqui"}
                        link={"/login"}
                    />
                </div>
            </div>



            <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                         style={{backgroundImage: "url(/assets/img/curved-images/curved11.jpg)"}}></div>
                </div>
            </div>
        </Container>
    );
}