import { ClientOnly } from './ClientOnly';
import getCurrentUser from './actions/getCurrentuser';
import { LoginModal } from './components/modal/LoginModal';
import { Modals } from './components/modal/Modals';
import { RegisterModal } from './components/modal/RegisterModal';
import { RentModal } from './components/modal/RentModal';
import SearchModal from './components/modal/SearchModal';
import { Navbar } from './components/navbar/Navbar';
import ToasterProvider from './components/provider/ToasterProvider';
import './globals.css'
import {Montserrat} from 'next/font/google';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb personal clone project',
}

const font = Montserrat({
  subsets:['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const currentuser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModal/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser={currentuser}/>
        </ClientOnly>
        <div className='pt-40'>
        {children}
        </div>
      </body>
    </html>
  )
}
