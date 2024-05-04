import { withChakraBaseProvider } from '@/HOC/ChakraProviderHOC'
import { Footer, Header } from '@/components/ui'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default withChakraBaseProvider(UserLayout);