import {editarAtividade} from "../../service/atividade.service";
import {AlertError, AlertSuccess} from "../../adapters/alert";

export async function handleEditarAtividade(dados, atividades, setAtividades) {
   try {
       const response = await editarAtividade(dados);

       const atividadesAtualizadas = atividades.map(atividade => {
           if (atividade.id === dados.id) {
               return response;
           }

           return atividade;
       });

       setAtividades([...atividadesAtualizadas]);

       AlertSuccess('Atividade editada com sucesso!')
   } catch (e) {
       AlertError(e.message)
   }
}