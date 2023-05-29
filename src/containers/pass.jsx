import { useTranslation } from 'react-i18next';
import { InView } from 'react-intersection-observer';

//svg import
import {ReactComponent as Diagram} from '../assets/icons/card.svg';
import {ReactComponent as People} from '../assets/icons/star.svg';
import {ReactComponent as Redistribute} from '../assets/icons/badge.svg';

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
                    <p>555</p>
                </div>
                <div className='item'>
                    <p>{t("pass_distrib")}</p>
                    <p>5 NFT</p>
                </div>
                <div className='item'>
                    <p>{t("pass_sale")}</p>
                    <p>0.01 ETH</p>
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
                <h2>{t("pass_benefits")}</h2>
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