import { useTranslation } from 'react-i18next';
import { InView } from 'react-intersection-observer';

//svg import
import {ReactComponent as Cpu} from '../assets/icons/cpu.svg';
import {ReactComponent as Diagram} from '../assets/icons/diagram.svg';
import {ReactComponent as People} from '../assets/icons/people.svg';
import {ReactComponent as Redistribute} from '../assets/icons/redistribution.svg';

//style
import "../style/pass.scss"

export default function Pass(){
    
    const {t} = useTranslation()

    return(
        <section className='pass'>
            <div>
                <h2>{t("pass_title")}</h2>
                <div className='item'>
                    <p>{t("pass_supply")}</p>
                    <p>5,550</p>
                </div>
                <div className='item'>
                    <p>{t("pass_distrib")}</p>
                    <p>25 NFT</p>
                </div>
                <div className='item'>
                    <p>{t("pass_sale")}</p>
                    <p>5273</p>
                </div>
                <div className='item'>
                    <p>{t("pass_blockchain")}</p>
                    <p>Arbitrum</p>
                </div>
                <div className='item'>
                    <p>{t("pass_nft")}</p>
                    <p>ERC - 1155</p>
                </div>
                <div className='item'>
                    <p>{t("pass_fee")}</p>
                    <p>5%</p>
                </div>
            </div>
            <InView onChange={(a,entry)=>{if(a)entry.target.classList.add("entered")}}>
                <div className='industry_item'>
                    <Diagram/>
                    <p>
                        {t("industry_app")}
                    </p>
                </div>
                <div className='industry_item'>
                    <People/>
                    <p>
                        {t("industry_funding")}
                    </p>
                </div>
                <div className='industry_item'>
                    <Redistribute />
                    <p>
                        {t("industry_redistributed")}
                    </p>
                </div>
            </InView>
        </section>
    )
}