'use client'

import z from 'zod'
import { FormInput } from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// バリデーションスキーマを定義
export const loginSchema = z.object({
    email: z.string().nonempty("メールアドレスは必須です"),
    password: z.string().nonempty("パスワードは必須です")
})
// スキーマから型を生成
type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
    // エラー表示用のステート
    const [error, setError] = useState("")
    // ルーターの取得
    const router = useRouter()
    const callbackUrl = '/dashboard'
    // フォーム管理の初期化（バリデーションルールをZodで指定）
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })
    // フォーム送信時の処理
    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl
            })
            // 認証結果を表示
            console.log('Res', res)

            if (!res?.error) {
                router.push(callbackUrl)
            } else {
                setError('メールアドレスまたはパスワードが正しくありません')
            }
        } catch (err: unknown) {
            console.log('Error Info: ', err)
        }
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
            <Card className="w-full max-w-lg m-8 p-6">
                <CardHeader className="mb-6">
                    <CardTitle className="text-2xl">Login to your account</CardTitle>
                </CardHeader>
                <CardContent className="mb-6">
                    <form className="space-y-12 w-full sm:w-[400px]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-8">
                            <FormInput id="email" type="email" label="Email" placeholder="e@example.com" name="email" error={errors.email} register={register} />
                            <FormInput id="password" type="password" label="Password" name="password" error={errors.password} register={register} />
                            <p className="text-sm text-red-500 min-h-5">
                                {error}
                            </p>
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