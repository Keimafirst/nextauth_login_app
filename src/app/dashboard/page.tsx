'use client'

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
    return (
        <main>
            <header className="text-gray-600 body-font bg-amber-200">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row justify-center text-5xl">
                    Login Test Success
                </div>
            </header>
            <section className="text-gray-600 body-font grid place-items-center h-screen">
                <div className="container px-5 py-24 mx-auto">
                    <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                        <p className="leading-relaxed text-2xl ">ログイン成功しました。</p>
                        <Button variant="outline" onClick={() => signOut({ callbackUrl: '/login' })}>Sign Out</Button>
                    </div>
                </div>
            </section>
        </main>
    )
}