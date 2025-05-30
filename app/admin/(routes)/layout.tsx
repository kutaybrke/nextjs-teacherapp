import React from 'react'
import SideBar from './dashboard/_components/SideBar'

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    )
}


export default AdminLayout