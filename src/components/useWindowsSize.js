import { useState, useEffect } from "react"

export const useWindowsSize =()=>{

const [largeur,setLargeur] = useState(window.innerWidth);
const [hauteur,setHauteur] = useState(window.innerHeight);

const updateSize=()=>{
    setLargeur(window.innerWidth);
    setHauteur(window.innerHeight);
}

useEffect( ()=>{
    window.addEventListener("resize",updateSize);
    return() => window.removeEventListener("resize",updateSize)
}
)

return [largeur,hauteur]
}