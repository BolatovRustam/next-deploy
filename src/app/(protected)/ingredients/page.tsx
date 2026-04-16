"use client"

import IngredientsTable from "@/components/UI/tables/ingredients.table"
import IngredientForm from "@/forms/ingredient.form"

const IngredientsPage = () => {
    return (
        <div className="max-w-3xl">
            <IngredientForm/>
            <IngredientsTable/>
        </div>
    )
}

export default IngredientsPage