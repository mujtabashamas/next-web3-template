import React, { ReactNode } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Header } from './Header'
import { Header2 } from './Header2'
import { Footer } from './Footer'
import { NetworkStatus } from './NetworkStatus'
import { useRouter } from 'next/router'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  
  const [layout, setLayout] = React.useState('header')

  const router = useRouter();

  React.useEffect(() => {
    const path = router.pathname

    if (path === '/example2') {
      setLayout('header2')
    } else {
      setLayout('header')
    }
  }, [router.pathname])

  
  return (
    <Box margin="0 auto" minH="100vh">

      {layout === "header" &&
        <Header />
      }

      {layout === "header2" &&
        <Header2 />
      }

      <Container maxW="container.lg">{props.children}</Container>

      <Box position="fixed" bottom={2} right={2}>
        <NetworkStatus />
      </Box>

      <Footer />
    </Box>
  )
}
