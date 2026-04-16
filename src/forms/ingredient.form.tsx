"use client"

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options"
import { Button, FieldError, Form, Input, Label, ListBox, Select, TextField } from "@heroui/react"
import { useState, useTransition } from "react"
import type { Key } from "@heroui/react"
import { useIngredientStore } from "@/store/ingredient.store"

const initialState = {
        name: "",
        category: "" as Key | null,
        unit: "" as Key | null,
        pricePerUnit: null as number | null,
        description: ""
    }

const IngredientForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [isPending, startTransition] = useTransition()
     const { addIngredient, error: storeError } = useIngredientStore()

    const handleSubmit = async (formData: FormData) => {    
        startTransition(async () => {
        await addIngredient(formData)
        const currentError = useIngredientStore.getState().error
            if (!currentError) {
                setFormData(initialState)
            }
        });
    }

    return (
        <Form className="w-full flex flex-col gap-3" action={handleSubmit}>
            {storeError && <p className="text-red-500 mb-4">{storeError}</p>}


            {/* Название */}
            <TextField isRequired name="name" className="w-full">
                <Label className="sr-only">Название</Label>
                <Input
                    placeholder="Введите название ингредиента"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <FieldError />
            </TextField>

            <div className="flex gap-2 w-full">

                {/* Категория */}
                <div className="w-1/3">
                    <Select
                        isRequired 
                        name="category"
                        placeholder="Категория"
                        value={formData.category}
                        onChange={(key) => setFormData({ ...formData, category: key })}
                    >
                        <Label className="sr-only">Категория</Label>
                        <Select.Trigger className="w-full">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {CATEGORY_OPTIONS.map((option) => (
                                    <ListBox.Item key={option.value} id={option.value} textValue={option.label} className="text-black">
                                        {option.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                        <FieldError />
                    </Select>
                </div>

                {/* Единица измерения */}
                <div className="w-1/3">
                    <Select
                        isRequired 
                        name="unit"
                        placeholder="Ед. изм."
                        value={formData.unit}
                        onChange={(key) => setFormData({ ...formData, unit: key })}
                    >
                        <Label className="sr-only">Единица</Label>
                        <Select.Trigger className="w-full">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {UNIT_OPTIONS.map((option) => (
                                    <ListBox.Item key={option.value} id={option.value} textValue={option.label} className="text-black">
                                        {option.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                        <FieldError />
                    </Select>
                </div>

                {/* Цена */}
                <div className="w-1/3">
                    <TextField isRequired name="pricePerUnit" className="w-full">
                        <Label className="sr-only">Цена</Label>
                        <div className="relative flex items-center ">
                        <Input
                            placeholder="Цена"
                            type="number"
                            value={formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ""}
                            onChange={(e) => {
                                const value = e.target.value ? parseFloat(e.target.value) : null
                                setFormData({ ...formData, pricePerUnit: value })
                            }}
                            className="w-full"
                        />
                        <span className="absolute right-7.5 text-gray-500/50 ">₸</span>
                        </div>
                        <FieldError />
                    </TextField>
                </div>
            </div>

            <TextField name="description" className="w-full">
                <Label className="sr-only">Описание</Label>
                <Input
                    placeholder="Введите описание (необязательно)"
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </TextField>

            <div className="flex w-full items-center justify-end">
                <Button variant="primary" type="submit" isDisabled={isPending}>
                    {isPending ? "Загрузка..." : "Добавить ингредиент"}
                </Button>
            </div>
        </Form>
    )
}

export default IngredientForm