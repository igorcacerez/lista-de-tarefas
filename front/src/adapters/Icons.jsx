import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as FontIcones from "@fortawesome/free-solid-svg-icons";

export function Icons({icon, size, color, ...props}) {
    if (typeof icon === "string") {
        if (!FontIcones[icon]) throw new Error(`Ícone ${icon} não encontrado.`);
        icon = FontIcones[icon];
    }

    return (
        <FontAwesomeIcon icon={icon} size={size} color={color} {...props} />
    )
}