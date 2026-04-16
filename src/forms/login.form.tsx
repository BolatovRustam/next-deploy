"use client"

import { signInWithCredentials } from "@/actions/sign-in";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

interface IProps {
    onClose: () => void
}

const LoginForm = ({ onClose }: IProps) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validate = () => {
        const newErrors = { email: "", password: "" };
        let valid = true;

        if (!formData.email) {
            newErrors.email = "Почта обязательна";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Пароль обязателен";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        console.log("Form submitted:", formData);

        await signInWithCredentials(formData.email, formData.password)

        window.location.reload()

        onClose();
    };

    return (
        <Form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="w-full">
                <Input
                    aria-label="Email"
                    name="email"
                    placeholder="Введите email"
                    type="email"
                    value={formData.email}
                    className="w-full"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && (
                    <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                )}
            </div>

            <div className="w-full">
                <Input
                    name="password"
                    placeholder="Введите пароль"
                    type="password"
                    value={formData.password}
                    className="w-full"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && (
                    <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                )}
            </div>

            <div className="flex gap-2 w-full justify-end mt-8">
                <Button variant="ghost" onPress={onClose}>
                    Отмена
                </Button>
                <Button variant="primary" type="submit" className="rounded-md">
                    Войти
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;