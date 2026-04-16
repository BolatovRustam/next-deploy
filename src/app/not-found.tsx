"use client"
import { Button } from "@heroui/react"
import Link from "next/link"

const NotFound = () => {
    return (
    <div className="flex flex-col items-center justify-center ">
        <div className="text-8xl font-bold text-gray-300">404</div>

        <h1 className="text-3xl font-bold tracking-tight">Страница не найдена</h1>

        <Link href="/" className="pt-6">
            <Button className="bg-primary text-white" variant="primary">
                Вернуться на главную
            </Button>
        </Link>

    </div> 
    )
}

export default NotFound