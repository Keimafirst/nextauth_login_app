'use client'

import { FormInput } from "@/components/form/formInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// バリデーションスキーマを定義
export const registerSchema = z.object({
    username: z
        .string()
        .min(2, "2文字以上で入力してください")
        .max(20, "20文字以内で入力してください"),
    email: z.string().email("正しいメールアドレスを入力してください"),
    password: z.string().min(8, "8文字以上で入力してください"),
});
// スキーマから型を生成
type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {

    // エラー表示用のステート
    const [error, setError] = useState("")

    // フォーム管理の初期化（バリデーションルールをZodで指定）
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })
    // フォーム送信時の処理
    const onSubmit = async (data: RegisterFormData) => {
        console.log("登録データ:", data)
        try {
            // 登録処理実行
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            // 登録結果のエラーハンドリング
            if (!res.ok) {
                const errorText = await res.text()
                console.error("登録失敗:", errorText)
                setError("登録処理に失敗しました")
                return
            }

            // ログイン画面へ遷移
            signIn()
        } catch (err: unknown) {
            console.log('Error Info: ', err)
        }
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
            <Card className="w-full max-w-lg m-8 p-6">
                <CardHeader className="mb-6">
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                </CardHeader>
                <CardContent className="mb-6">
                    <form className="space-y-12 w-full sm:w-[400px]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-8">
                            <FormInput id="username" type="text" label="UserName" placeholder="Enter your username" name="username" error={errors.username} register={register} />
                            <FormInput id="email" type="email" label="Email" placeholder="m@example.com" name="email" error={errors.email} register={register} />
                            <FormInput id="password" type="password" label="Password" name="password" error={errors.password} register={register} />
                            <p className="text-sm text-red-500 min-h-5">
                                {error}
                            </p>
                        </div>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">Register</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}