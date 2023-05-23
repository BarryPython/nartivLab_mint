import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "i18next"

//svg
import { ReactComponent as Sun } from "../assets/icons/sun.svg"
import { ReactComponent as Moon } from "../assets/icons/moon.svg"
import { ReactComponent as BackArrow } from "../assets/icons/arrowBack.svg"

//style
import "../style/navBar.scss"

export default function NavBar({setDark,dark}){
    
    const {t} = useTranslation()
    const navRef = useRef()
    const [scrolled, setScrolled] = useState(false)

    function switch_dark(dark){
        const elements = document.querySelectorAll('*');
        if(dark){
            elements.forEach((element) => {
                element.classList.add('dark');
            });
        }else{
            elements.forEach((element) => {
                element.classList.remove('dark');
            });
        }
    }
    
    return(
        <nav ref={navRef}>
            <a href='https://narativlab.io/'>
                <BackArrow />
                {t("nav_back")}
            </a>
            <div>
                <select className='secondary-btn' defaultValue={i18n.language} onChange={(e)=>{i18n.changeLanguage(e.target.value)}}>
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                </select>
                <button onClick={()=>{setDark(!dark);switch_dark(dark);}}>
                    {!dark ? <Sun /> : <Moon />}
                </button>
            </div>
        </nav>
    )
}