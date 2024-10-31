import React from 'react'
import { Flex, useColorModeValue, Spacer, Heading } from '@chakra-ui/react'
import { SITE_NAME } from 'utils/config'
import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'
// import { Web3Button } from '@web3modal/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

interface Props {
  className?: string
}

const styles = {
  card: {
    margin: '30px',
    'font-size': '18px',
    height: '65px',
    width: '250px',
    borderRadius: '10px',
    border: 'none',
    boxShadow: `1px 1px 0px 2px rgba(0,0,0,0.3)`,
    background: `rgb(141,217,252)`,
    cursor: 'pointer',
  },
}

export function Header2(props: Props) {
  const className = props.className ?? ''

  const { address, connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <Flex as="header" className={className} bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={2} mb={8} alignItems="center">
      <LinkComponent href="/">
        <Heading as="h1" size="md">
          {SITE_NAME} - Separate Connecters
        </Heading>
      </LinkComponent>

      <Spacer />

      <Flex alignItems="center" gap={4}>
        {isConnected ? (
          <>
            {' '}
            <div className="title">Connected to {connector?.name}</div>
            <div>{address?.slice(0, 4) + '...' + address?.slice(address.length - 4, address.length)}</div>
            <button
              style={{
                margin: '10px',
                fontSize: '18px',
                height: '35px',
                width: '150px',
                borderRadius: '7px',
                border: 'none',
                boxShadow: `1px 1px 0px 2px rgba(0,0,0,0.3)`,
                background: `dimgrey`,
                color: `white`,
                cursor: 'pointer',
              }}
              className="card"
              onClick={disconnect as any}>
              Disconnect
            </button>
          </>
        ) : (
          <div className="main">
            {/* <Web3Button /> */}
            {connectors.map((connector) => (
              <button
                style={{
                  margin: '10px',
                  fontSize: '18px',
                  height: '35px',
                  width: '150px',
                  borderRadius: '7px',
                  border: 'none',
                  boxShadow: `1px 1px 0px 2px rgba(0,0,0,0.3)`,
                  background: `dimgrey`,
                  color: `white`,
                  cursor: 'pointer',
                }}
                className="card"
                key={connector.id}
                onClick={() => connect({ connector })}>
                {connector.name}
              </button>
            ))}
          </div>
        )}
        <ThemeSwitcher />
      </Flex>
    </Flex>
  )
}
