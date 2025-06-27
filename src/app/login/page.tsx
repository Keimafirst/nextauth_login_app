'use client'

import { FormInput } from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
}
export default function LoginPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
            <Card className="w-full max-w-lg m-8 p-6">
                <CardHeader className="mb-6">
                    <CardTitle className="text-2xl">Login to your account</CardTitle>
                </CardHeader>
                <CardContent className="mb-6">
                    <form className="space-y-12 w-full sm:w-[400px]" onSubmit={onSubmit}>
                        <div className="flex flex-col gap-8">
                            <FormInput id="email" type="email" label="E-mail" placeholder="e@example.com" />
                            <FormInput id="password" type="password" label="Password" />
                        </div>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">Login</Button>
                            <p className="text-sm text-gray-600 self-start mt-4">
                                <Link href="/register" className="text-indigo-500 hover:underline">
                                    Create Account
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}