import { Box, Center, Spacer, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
// import { useWallet } from "@solana/wallet-adapter-react";
import Connected from "../components/mint/Connected";
import Disconnected from "../components/mint/Disconnected";
import { Head } from 'components/layout/Head'
import { useAccount, useConnect, useContractWrite } from 'wagmi'

import { FC, MouseEventHandler, useCallback } from "react";
import {
  Button,
  Container,
  Heading,
  Text,
  HStack,
  Image,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useWeb3Modal } from '@web3modal/wagmi/react'
const { open } = useWeb3Modal()

import { useState, useEffect } from 'react'
import { SismoConnectButton, SismoConnectResponse, SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-react'
import { CONFIG, AUTHS, CLAIMS, SIGNATURE_REQUEST, AuthType, ClaimType } from '../sismo-connect-config'

import { toast } from 'react-toastify';
import abiJson from '../utils/contract-abi.json';

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  const { connect } = useConnect()

  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] = useState<SismoConnectVerifiedResult>()
  const [sismoConnectResponse, setSismoConnectResponse] = useState<SismoConnectResponse>()
  const [pageState, setPageState] = useState<string>('init')
  const [errorSismo, setErrorSismo] = useState<string>('')

  const { data, isLoading, isSuccess, write, error, isError } = useContractWrite({
    address: "0x2f199a43195e692815f28c8ca5eba32ac0be1515",
    abi: abiJson,
    functionName: 'mint',
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Minted Successfully')
    }

    if (error) {
      // @ts-ignore
      toast.error(error?.shortMessage)
    }
  }, [error, isSuccess])

  console.log(SIGNATURE_REQUEST)

  return (
    <>
      <Head />
      <Stack w="full" h="calc(75vh)" justify="center">
        {/* <Spacer /> */}
        <Center>
          <VStack spacing={10}>
            <Heading
              color="white"
              as="h1"
              size="2xl"
              noOfLines={2}
              textAlign="center"
            >
              Sismo Connect Mint NFT POC
            </Heading>
            <HStack spacing={10}>
              <Image width={250} src="avatar1.png" alt="" />
            </HStack>
            <>
              <main className="main">
                {/* <Header /> */}
                {pageState == 'init' ? (
                  <SismoConnectButton
                    config={CONFIG}
                    // Auths = Data Source Ownership Requests. (e.g Wallets, Github, Twitter, Github)
                    auths={AUTHS}
                    // Claims = prove group membership of a Data Source in a specific Data Group.
                    // (e.g ENS DAO Voter, Minter of specific NFT, etc.)
                    // Data Groups = [{[dataSource1]: value1}, {[dataSource1]: value1}, .. {[dataSource]: value}]
                    // Existing Data Groups and how to create one: https://factory.sismo.io/groups-explorer
                    claims={CLAIMS}
                    // Signature = user can sign a message embedded in their zk proof
                    signature={SIGNATURE_REQUEST}
                    text="Prove with Sismo"
                    // Triggered when received Sismo Connect response from user data vault
                    onResponse={async (response: SismoConnectResponse) => {
                      setSismoConnectResponse(response)
                      setPageState('verifying')
                      const verifiedResult = await fetch('/api/verify', {
                        method: 'POST',
                        body: JSON.stringify(response),
                      })
                      const data = await verifiedResult.json()
                      if (verifiedResult.ok) {
                        setSismoConnectVerifiedResult(data)
                        setPageState('verified')
                      } else {
                        setPageState('error')
                        setErrorSismo(data)
                      }
                    }}
                  />
                ) : (
                  <>
                    <div className="status-wrapper">
                      {pageState == 'verifying' ? (
                        <span className="verifying"> Verifying ZK Proofs... </span>
                      ) : (
                        <>
                          {Boolean(errorSismo) ? (
                            <span className="error"> Error verifying ZK Proofs: {errorSismo} </span>
                          ) : (
                            <>
                              <VStack spacing={10}>
                                {SIGNATURE_REQUEST.isSelectableByUser && (
                                  <>
                                    {
                                      isConnected ?
                                        <Button bgColor="accent" color="white" maxW="380px">
                                          <HStack>
                                            <Text onClick={(e) => {
                                              e.preventDefault()
                                              write?.({
                                                args: [1],
                                                // @ts-ignore
                                                from: address,
                                                // value: BigInt(1000000000000000),
                                              })
                                            }}>Mint NFT</Text>
                                            <ArrowForwardIcon />
                                          </HStack>
                                        </Button>
                                        :
                                        <Button bgColor="accent" color="white" maxW="380px">
                                          <HStack>
                                            <Text onClick={(e) => {
                                              e.preventDefault()
                                              open();
                                            }}>Connect Wallet First</Text>
                                            <ArrowForwardIcon />
                                          </HStack>
                                        </Button>
                                    }
                                  </>
                                )}
                                {sismoConnectVerifiedResult && (
                                  <>
                                    <text> ZK Proofs verified!</text>
                                    <TableContainer>
                                      <Table variant='simple'>
                                        <Thead>
                                          <Tr>
                                            <Th>AuthType</Th>
                                            <Th>UserId</Th>
                                          </Tr>
                                        </Thead>
                                        <Tbody>
                                          {sismoConnectVerifiedResult.auths.map((auth, index) => (
                                            <Tr key={index}>
                                              <Td>{AuthType[auth.authType]}</Td>
                                              <Td>{auth.userId}</Td>
                                            </Tr>
                                          ))}

                                          {sismoConnectVerifiedResult.auths.map((auth, index) => (
                                            <Tr key={index}>
                                              <Td>{AuthType[auth.authType]}</Td>
                                              <Td>{auth.userId}</Td>
                                            </Tr>
                                          ))}
                                        </Tbody>
                                      </Table>
                                    </TableContainer>
                                  </>
                                )}
                              </VStack>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </main>
            </>


            {/* <Button
          bgColor="accent"
          color="white"
          maxW="380px"
          // onClick={handleClick}
        >
          <HStack onClick={() => open()}>
            <Text>
              Connect Wallet</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button> */}
          </VStack>
        </Center>
        {/* <Spacer /> */}
      </Stack >
    </>
  );
};

function readibleHex(userId: string, startLength = 6, endLength = 4, separator = '...') {
  if (userId) {
    if (!userId.startsWith('0x')) {
      return userId // Return the original string if it doesn't start with "0x"
    }
    return userId.substring(0, startLength) + separator + userId.substring(userId.length - endLength)
  }
  return userId
}

function getProofDataForAuth(sismoConnectResponse: SismoConnectResponse, authType: AuthType): string | null {
  for (const proof of sismoConnectResponse.proofs) {
    if (proof.auths) {
      for (const auth of proof.auths) {
        if (auth.authType === authType) {
          return proof.proofData
        }
      }
    }
  }

  return null // returns null if no matching authType is found
}

function getProofDataForClaim(sismoConnectResponse: SismoConnectResponse, claimType: number, groupId: string, value: number): string | null {
  for (const proof of sismoConnectResponse.proofs) {
    if (proof.claims) {
      for (const claim of proof.claims) {
        if (claim.claimType === claimType && claim.groupId === groupId && claim.value === value) {
          return proof.proofData
        }
      }
    }
  }

  return null // returns null if no matching claimType, groupId and value are found
}

export default Home;