//eslint-disable jsx-a11y/alt-text

import React, { Suspense, useState, useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import './i18n'

import NavBar from './containers/navbar';
import First from './containers/first';
import Pass from './containers/pass';

function App() {

  const [dark, setDark] = useState(true)

  const { chains, provider } = configureChains(
    [ arbitrum ],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  function switch_dark(dark){
    if(dark === "false"){
        setTimeout(()=>{
          const elements = document.querySelectorAll('*');
          setDark(false)
          elements.forEach((element) => {
            element.classList.add('dark');
        });
        },100)
    }
  }

  useEffect(() => {
    const stored = window.localStorage.getItem('dark')
    if(stored !== null){
      if(stored === "false"){
        setDark(false)
      }else{
        setDark(true)
      }
      switch_dark(stored);
    }
  }, []);

  useEffect(() => {
    if(dark !== null){
      window.localStorage.setItem('dark', dark);
    }
  }, [dark]);

  return (
    <div>
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} >
      <Suspense fallback={null}>
        <NavBar setDark={setDark} dark={dark} />
        <First />
        <Pass />
      </Suspense>
      </RainbowKitProvider>
    </WagmiConfig>
    </div>
  );
}

export default App;
