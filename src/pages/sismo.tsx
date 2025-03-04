'use client'

import { useState, useEffect } from 'react'
import { SismoConnectButton, SismoConnectResponse, SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-react'
import { CONFIG, AUTHS, CLAIMS, SIGNATURE_REQUEST, AuthType, ClaimType } from '../sismo-connect-config'

import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { toast } from 'react-toastify';
import abiJson from '../utils/contract-abi.json';


export default function Home() {
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] = useState<SismoConnectVerifiedResult>()
  const [sismoConnectResponse, setSismoConnectResponse] = useState<SismoConnectResponse>()
  const [pageState, setPageState] = useState<string>('init')
  const [errorSismo, setErrorSismo] = useState<string>('')


  const { address, isConnected } = useAccount();

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

  return (
    <>
      <main className="main">
        {/* <Header /> */}
        {pageState == 'init' ? (
          <>
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
              text="Prove With Sismo"
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
          </>
        ) : (
          <>
            <button
              onClick={() => {
                window.location.href = '/'
              }}>
              {' '}
              RESET{' '}
            </button>
            <br></br>
            <div className="status-wrapper">
              {pageState == 'verifying' ? (
                <span className="verifying"> Verifying ZK Proofs... </span>
              ) : (
                <>
                  {Boolean(errorSismo) ? (
                    <span className="error"> Error verifying ZK Proofs: {errorSismo} </span>
                  ) : (
                    <span className="verified"> ZK Proofs verified!</span>
                  )}
                </>
              )}
            </div>
          </>
        )}

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
          onClick={(e) => {
            e.preventDefault()
            write?.({
              args: [1],
              // @ts-ignore
              from: address,
              // value: BigInt(1000000000000000),
            })
          }}>
          {' '}
          MINT NFT{' '}
        </button>

        {/* Table of the Sismo Connect requests and verified result */}

        {/* Table for Verified Auths */}
        {sismoConnectVerifiedResult && (
          <>
            <h3>Verified Auths</h3>
            <table>
              <thead>
                <tr>
                  <th>AuthType</th>
                  <th>Verified UserId</th>
                </tr>
              </thead>
              <tbody>
                {sismoConnectVerifiedResult.auths.map((auth, index) => (
                  <tr key={index}>
                    <td>{AuthType[auth.authType]}</td>
                    <td>{auth.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <br />

        {/* Table for Verified Claims */}
        {sismoConnectVerifiedResult && (
          <>
            <h3>Verified Claims</h3>
            <table>
              <thead>
                <tr>
                  <th>groupId</th>
                  <th>ClaimType</th>
                  <th>Verified Value</th>
                </tr>
              </thead>
              <tbody>
                {sismoConnectVerifiedResult.claims.map((claim, index) => (
                  <tr key={index}>
                    <td>
                      <a target="_blank" rel="noreferrer" href={'https://factory.sismo.io/groups-explorer?search=' + claim.groupId}>
                        {claim.groupId}
                      </a>
                    </td>
                    <td>{ClaimType[claim.claimType!]}</td>
                    <td>{claim.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Table of the Auths requests*/}
        <h3>Auths requested</h3>
        <table>
          <thead>
            <tr>
              <th>AuthType</th>
              <th>Requested UserId</th>
              <th>Optional?</th>
              <th>ZK proof</th>
            </tr>
          </thead>
          <tbody>
            {AUTHS.map((auth, index) => (
              <tr key={index}>
                <td>{AuthType[auth.authType]}</td>
                <td>{readibleHex(auth.userId || 'No userId requested')}</td>
                <td>{auth.isOptional ? 'optional' : 'required'}</td>
                {sismoConnectResponse ? (
                  <td>{readibleHex(getProofDataForAuth(sismoConnectResponse, auth.authType)!)}</td>
                ) : (
                  <td> ZK proof not generated yet </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <br />

        {/* Table of the Claims requests*/}
        <h3>Claims requested</h3>
        <table>
          <thead>
            <tr>
              <th>GroupId</th>
              <th>ClaimType</th>
              <th>Requested Value</th>
              <th>Can User Select Value?</th>
              <th>Optional?</th>
              <th>ZK proof</th>
            </tr>
          </thead>
          <tbody>
            {CLAIMS.map((claim, index) => (
              <tr key={index}>
                <td>
                  <a target="_blank" rel="noreferrer" href={'https://factory.sismo.io/groups-explorer?search=' + claim.groupId}>
                    {claim.groupId}
                  </a>
                </td>
                <td>{ClaimType[claim.claimType || 0]}</td>
                <td>{claim.value ? claim.value : '1'}</td>
                <td>{claim.isSelectableByUser ? 'yes' : 'no'}</td>
                <td>{claim.isOptional ? 'optional' : 'required'}</td>
                {sismoConnectResponse ? (
                  <td>{readibleHex(getProofDataForClaim(sismoConnectResponse, claim.claimType || 0, claim.groupId!, claim.value || 1)!)}</td>
                ) : (
                  <td> ZK proof not generated yet </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table of the Signature request and its result */}
        <h3>Signature requested and verified</h3>
        <table>
          <thead>
            <tr>
              <th>Message Requested</th>
              <th>Can User Modify message?</th>
              <th>Verified Signed Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{SIGNATURE_REQUEST.message}</td>
              <td>{SIGNATURE_REQUEST.isSelectableByUser ? 'yes' : 'no'}</td>
              <td>{sismoConnectVerifiedResult ? sismoConnectVerifiedResult.signedMessage : 'ZK proof not verified yet'}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}

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
