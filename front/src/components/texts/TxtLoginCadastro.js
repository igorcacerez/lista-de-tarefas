import {Link} from "react-router-dom";

export function TxtLoginCadastro({text, txtLnk, link}) {
    return (
        <div className="card-footer text-center pt-0 px-lg-2 px-1">
            <p className="mb-4 text-sm mx-auto">
                {text}

                <Link to={link} className="text-info text-gradient font-weight-bold">
                    {txtLnk}
                </Link>
            </p>
        </div>
    )
}