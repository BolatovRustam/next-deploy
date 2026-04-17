"use client"

import { registerUser } from "@/actions/register";
import { Button, Form, Input, toast } from "@heroui/react";
import { useState } from "react";

interface IProps {
    onClose: () => void
}

const RegistrationForm = ({ onClose }: IProps) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]/;
        return emailRegex.test(email);
    };

    const validate = () => {
        const newErrors = { email: "", password: "", confirmPassword: "" };
        let valid = true;

        if (!formData.email) {
            newErrors.email = "Почта обязательна";
            valid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Некорректный email";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Пароль обязателен";
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Пароль должен быть не менее 6 символов";
            valid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Пароль для подтверждения обязателен";
            valid = false;
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Пароли не совпадают";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        console.log("Form submitted:", formData);

        const result = await registerUser(formData)

        if ('error' in result) {
        toast.danger(result.error || "Ошибка при регистрации")
    } else {
        toast.success("Регистрация прошла успешно!")
        onClose()
    }
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

            <div className="w-full">
                <Input
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    type="password"
                    value={formData.confirmPassword}
                    className="w-full"
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>
                )}
            </div>

            <div className="flex gap-2 w-full justify-end mt-8 ">
                <Button variant="ghost" onPress={onClose}>
                    Отмена
                </Button>
                <Button variant="primary" type="submit" className="rounded-md">
                    Зарегистрироваться
                </Button>
            </div>
        </Form>
    );
};

export default RegistrationForm;