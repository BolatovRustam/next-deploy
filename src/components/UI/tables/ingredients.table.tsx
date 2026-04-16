"use client"

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options"
import { useAuthStore } from "@/store/auth.store"
import { useIngredientStore } from "@/store/ingredient.store"
import { Button, Table } from "@heroui/react"

const IngredientsTable = () => {
    const { ingredients, removeIngredient, isLoading } = useIngredientStore()
    const { isAuth } = useAuthStore()

    const handleDelete = async (id: string) => { 
        await removeIngredient(id)
    }

    const getCategoryLabel = (value: string) => {
        const option = CATEGORY_OPTIONS.find((opt) => opt.value === value)
        return option ? option.label : value
    }

    const getUnitLabel = (value: string) => {
        const option = UNIT_OPTIONS.find((opt) => opt.value === value)
        return option ? option.label : value
    }

    if(!isAuth) {
        return <p>Не авторизован</p>;
    }

    return !isLoading && isAuth ? (
        <Table className="mt-6 w-full">
            <Table.ScrollContainer>
                <Table.Content aria-label="Список ингредиентов">
                    <Table.Header>
                        <Table.Column className="text-black border-r border-divider">Название</Table.Column>
                        <Table.Column className="text-black border-r border-divider">Категория</Table.Column>
                        <Table.Column className="text-black border-r border-divider">Ед. изм.</Table.Column>
                        <Table.Column className="text-black border-r border-divider">Цена за единицу</Table.Column>
                        <Table.Column className="text-black border-r border-divider">Описание</Table.Column>
                        <Table.Column className="text-black border-r border-divider">Действия</Table.Column>
                    </Table.Header>
                    <Table.Body className="overflow-auto max-h-10">
                        {ingredients.map((ingredient) => (
                            <Table.Row key={ingredient.id} >
                                <Table.Cell className="text-black border-r border-black/20">{ingredient.name}</Table.Cell>
                                <Table.Cell className="text-black border-r border-black/20">{getCategoryLabel(ingredient.category)}</Table.Cell>
                                <Table.Cell className="text-black border-r border-black/20">{getUnitLabel(ingredient.unit)}</Table.Cell>
                                <Table.Cell className="text-black border-r border-black/20">
                                    {ingredient.pricePerUnit !== null
                                        ? `${ingredient.pricePerUnit} ₸`
                                        : "-"}
                                </Table.Cell >
                                <Table.Cell className="text-black border-r border-black/20">{ingredient.description || "-"}</Table.Cell>
                                <Table.Cell className="text-black border-r border-black/20">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onPress={() => handleDelete(ingredient.id)}
                                        className="hover:bg-gray-500/15"
                                    >
                                        Удалить
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    ) : ( <p>Загрузка...</p> )
}

export default IngredientsTable