import { useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    useAccount,
    useConnect,
    useContract,
    useContractRead,
    useContractWrite,
    useNetwork,
    useWaitForTransaction,
    useSigner,
    useProvider
  } from "wagmi";
  import { ethers } from "ethers";

//style
import "../style/first.scss"

//svg import
import {ReactComponent as Moins} from '../assets/icons/moins.svg';
import {ReactComponent as Plus} from '../assets/icons/plus.svg';

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../Abi/mintContract';


export default function First(){


    const {t} = useTranslation()
    const [day, setDay] = useState()
    const [hour, setHour] = useState()
    const [minute, setminute] = useState()

    const [sold, setSold] = useState(0)
    const [ethToBuy, setEthToBuy] = useState(0)
    const [mintPrice, setMintPrice] = useState(0)

    const {  address, connector: activeConnector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { data: signerData } = useSigner();
    // const provider = useProvider()

    // const web3 = new Web3((provider));
    // const joeContract1 = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)


    const notifySuccess = () => {
    
        toast.success('Successfully Minted NFTs !', {
          position: "bottom-right",
          autoClose: 5000,
          closeOnClick: true,
          });
      
    };

    const notifyError = () => {
    
        toast.error('Please select number of NFTs !', {
          position: "bottom-right",
          autoClose: 5000,
          closeOnClick: true,
          });
      
    };



    function computeDay(){
        
        const now = new Date();
        const target = new Date(2024,3,30,19);
        const diffTime = target - now;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60)) - (diffDays * 24);
        const diffMinutes = Math.floor(diffTime / (1000 * 60)) - (diffDays * 24 * 60) - (diffHours * 60);
        setDay(diffDays);
        setHour(diffHours);
        setminute(diffMinutes)
    }

    const response = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "publicSalePrice",
      });
    


 // Mint Function
  const {
    data: mintData,
    write: mintToken,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "publicSaleMint",
    args: [1]
  });

const buyTokens = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signerData,
  });

  // Total tokens
  const { data: totalSupplyData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "totalSupply",
    args: [0],
    watch: true,
  });


  useEffect(() => {
   
    if (Number(totalSupplyData)) {
     
      setSold(Number(totalSupplyData));
    }
  }, [totalSupplyData]);

 
  
    //
    ////////  MESSAGE TO BLOCKCHAIN DEV ////////
    //
    //hello dear blockchain dev
    // the next sections are for you to trigger any needed action to buy nft or get already sold amount

   const Buy = async () => {
        //for the blockchain dev
        //amount is the amount of ntf to buy
        //this function is fired when the user click on "Buy"


        if(ethToBuy < 1){
            alert("Please Select Number Of NFTs !")
            return
        }
       
        try {
         const nftTxn = await buyTokens.publicSaleMint(ethToBuy, {value: (mintPrice*ethToBuy).toLocaleString('fullwide', { useGrouping: false })});
         
        } catch(e) {
            console.log("error",e)
          alert("Error in minting NFTs !")
        }
      
          
    }

 // Check TX for mint function
  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    confirmations: 1,
    hash: mintData?.hash,
  });

  useEffect(()=>{
  
  setMintPrice(Number(response?.data))

  }, [response]) 

  useEffect(()=>{
    if (ethToBuy > 5){
        setEthToBuy(5);
    }else if (ethToBuy < 0){
        setEthToBuy(0);
    }
  },[ethToBuy]);


    function BuyOpenSea(){
        //for the blockchain dev
        //the fuction is fired when user click on buy on openSea

        window.location.replace('https://opensea.io/assets/ethereum/0xcaf5b168d6cdcce096043b4e9fb564fb10e8819a/');
    }

    function SetNftAmountSolded(){
        //for the blockchain dev
        //the fuction set the number of nft already sold
        //it's called on the page mount

        //affect solded amount to 0 by default
        //setSold(0);
    }

  

    function beforeSale(){
        return(
            <div>
                <h1>{t("main_title")}</h1>
                <p>{t("main_subtitle")}</p>
                <div>
                    <div>
                        <button style={{"pointer-events": "none"}}>
                            0.01 ETH 
                        </button>
                        <button>
                            {sold} / 555
                        </button>
                    </div>
                    <div className='sale-btn'>
                        <span>
                            <button onClick={()=>{setEthToBuy(ethToBuy-1)}}><Moins /></button>
                            <p>{ethToBuy}</p>
                            <button onClick={()=>{setEthToBuy(ethToBuy+1)}}><Plus /></button>
                        </span>
                        <button className='main-btn'>
                            {t("main_coming")}  
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    function whileSale(){
        return(
            <div>
                <h1>{t("main_title")}</h1>
                <p>{t("main_subtitle")}</p>
                <div>
                    <div>
                        <button>
                            0.01 ETH 
                        </button>
                        <button>
                            {sold} / 555
                        </button>
                    </div>
                    <div className='sale-btn'>
                        <span>
                            <button onClick={()=>{setEthToBuy(ethToBuy-1)}}><Moins /></button>
                            <p>{ethToBuy}</p>
                            <button onClick={()=>{setEthToBuy(ethToBuy+1)}}><Plus /></button>
                        </span>
                        {isConnected ? (
                        <button className='main-btn' style ={{ backgroundColor: "#7EE48C",
                            color: "black"}} onClick={()=>{Buy(ethToBuy)}}>
                            {t("main_buy")}  
                        </button>) : (
                        <div>
                        <ConnectButton className='connect-btn' />
                        </div>
                        )} 
                    </div>
                </div>
            </div>
        )
    }

    function afterSale(){
        return(
            <div>
                <h1>{t("main_title")}</h1>
                <p>{t("main_subtitle")}</p>
                <div>
                    <div>
                        <button>
                            0.01 ETH 
                        </button>
                        <button>
                            555 / 555
                        </button>
                    </div>
                    <button className='main-btn' onClick={()=>BuyOpenSea()}>
                        {t("main_openSea")}
                    </button>
                </div>
            </div>
        )
    }
    
    useEffect(()=>{
        const slowWhileLoop = async () => {
            SetNftAmountSolded()
            let cond = true;
            while (cond) {
              await new Promise(resolve => setTimeout(resolve, 1000));
              computeDay()
              if(day < 0){
                cond = false
              }
            }
          };
          slowWhileLoop();
    },[])

    useEffect(()=>{
        computeDay()
    },[])

    return(
     
        <section className='first'>
          
            {day < 0 ? sold > 555 ? afterSale() : whileSale() : beforeSale()}
            <div className=''>
            </div>
        </section>
      
        
    )
}