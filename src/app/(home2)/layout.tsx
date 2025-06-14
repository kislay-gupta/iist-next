import Navbar from '@/components/newHome/Navbar'
import Footer from '@/components/shared/Footer'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default Layout