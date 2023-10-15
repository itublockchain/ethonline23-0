import { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers'
import { Grid, TextField, Button } from '@mui/material'

import { StripeSession, StripePack } from '@safe-global/onramp-kit'

const isSessionValid = (sessionId: string) => sessionId.length === 28

export default function Stripe() {
    const stripePublicKey = "pk_test_51O0x1EJ2fec4bVWHcpuPVoVP4LQNt5jPdQ6vo06DypOEIG7Jhg23RdIf4FCUYtDLoX9WJQMLOodFdCygtM0gu7Vg00og0zdwna"
    const onRampBackendUrl = "http://localhost:3001"
    const [walletAddress, setWalletAddress] = useState<string>('')
    const [sessionId, setSessionId] = useState<string>('')
    const [stripePack, setStripePack] = useState<StripePack>()
    const stripeRootRef = useRef<HTMLDivElement>(null)

    const handleCreateSession = async () => {
        if (!isSessionValid(sessionId) && !ethers.utils.isAddress(walletAddress)) return

        if (stripeRootRef.current) {
            stripeRootRef.current.innerHTML = ''
    }

    const sessionData = (await stripePack?.open({
      element: '#stripe-root',
      sessionId: sessionId,
      theme: 'light',
      defaultOptions: {
        transaction_details: {
          wallet_address: walletAddress,
          supported_destination_networks: ['ethereum', 'polygon'],
          supported_destination_currencies: ['usdc'],
          lock_wallet_address: true
        },
        customer_information: {
          email: 'john@doe.com'
        }
      }
    })) as StripeSession

    stripePack?.subscribe('onramp_ui_loaded', () => {
      console.log('UI loaded')
    })

    stripePack?.subscribe('onramp_session_updated', (e: any) => {
      console.log('Session Updated', e.payload)
    })

    setWalletAddress(sessionData?.transaction_details?.wallet_address || '')
  }

  useEffect(() => {
    ;(async () => {
      const pack = new StripePack({
        stripePublicKey,
        onRampBackendUrl
      })

      await pack.init()

      setStripePack(pack)
    })()
  }, [])

  return (
    <Grid container height="80vh">
      <Grid item sm={12} md={4} p={2} sx={{ borderRight: `1px solid #303030` }}>
        <TextField
          id="wallet-address"
          label="Wallet address"
          placeholder="Enter the address you want to initialize the session with"
          variant="outlined"
          value={walletAddress}
          onChange={(event) => setWalletAddress(event.target.value)}
          sx={{ width: '100%' }}
        />
        <TextField
          id="session-id"
          label="Session id"
          placeholder="Enter the session id if you have one"
          variant="outlined"
          value={sessionId}
          onChange={(event) => setSessionId(event.target.value)}
          sx={{ width: '100%', mt: 2 }}
        />
        <br />
        <Button variant="contained" onClick={handleCreateSession} sx={{ mt: 3 }}>
          Create session
        </Button>
      </Grid>
      <Grid item sm={12} md={8} p={2}>
        <div id="stripe-root" ref={stripeRootRef}></div>
      </Grid>
    </Grid>
  )
}