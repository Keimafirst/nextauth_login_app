import { Label } from "@radix-ui/react-label"
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form"
import { Input } from "../ui/input"

type Props<T extends FieldValues> = {
    id: string
    type: string
    label: string
    placeholder?: string
    name: Path<T>
    error?: FieldError
    register: UseFormRegister<T>
}

export function FormInput<T extends FieldValues>({ id, type, label, placeholder, name, error, register }: Props<T>) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                className="w-full"
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name)}
            />
            <p className="text-sm text-red-500 min-h-5">
                {error?.message ?? ""}
            </p>
        </div>
    )
}