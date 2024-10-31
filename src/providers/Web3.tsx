'use client'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider } from '@web3modal/wagmi'

import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ETH_CHAINS, THEME_COLOR_SCHEME } from 'utils/config'
import { useColorMode } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import Web3AuthConnectorInstance from '../providers/Web3Auth'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { LensProvider, LensConfig, production } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'

interface Props {
  children: ReactNode
}

const projectId = 'f58eccc0cee96dc4f9964abe4a359ce1'
if (!projectId) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}
// const { chains, publicClient, webSocketPublicClient } = configureChains(ETH_CHAINS, [publicProvider(), w3mProvider({ projectId: projectId })])

const { chains, publicClient } = configureChains(ETH_CHAINS, [walletConnectProvider({ projectId }), publicProvider()])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'f58eccc0cee96dc4f9964abe4a359ce1',
        showQrModal: false,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    Web3AuthConnectorInstance(chains),
  ],
  publicClient,
})

createWeb3Modal({ wagmiConfig, projectId, chains })

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
}

// const ethereumClient = new EthereumClient(wagmiConfig, chains)

export function Web3Provider(props: Props) {
  const { colorMode } = useColorMode()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready && (
        <WagmiConfig config={wagmiConfig}>
          <LensProvider config={lensConfig}>{props.children}</LensProvider>
        </WagmiConfig>
      )}
    </>
  )
}
