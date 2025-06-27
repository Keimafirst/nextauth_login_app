import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"

type Props = {
    id: string
    type: string
    label: string
    placeholder?: string
}

export function FormInput({ id, type, label, placeholder }: Props) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                className="w-full"
                id={id}
                type={type}
                placeholder={placeholder}
            />
            <p className="text-sm text-red-500 min-h-5">
                エラーメッセージ
            </p>
        </div>
    )
}