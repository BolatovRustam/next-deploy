"use client";

import { useState, useTransition } from "react";
import {
  Button,
  Form,
  Input,
  TextField,
  Label,
  FieldError,
  Select,
  ListBox,
} from "@heroui/react";
import type { Key } from "@heroui/react";
import { useIngredientStore } from "@/store/ingredient.store";
import { useRecipeStore } from "@/store/recipe.store";
import { IRecipe } from "@/types/recipe";
import { useRouter } from "next/navigation";

interface RecipeFormProps {
  initialRecipe?: IRecipe;
}

interface IIngredientField {
  id: number;
  ingredientId: string;
  quantity: number | null;
}

const initialState = {
  name: "",
  description: "",
  imageUrl: ""
};

const RecipeForm = ({ initialRecipe }: RecipeFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialRecipe?.name || initialState.name,
    description: initialRecipe?.description || initialState.description,
    imageUrl: initialRecipe?.imageUrl || initialState.imageUrl
  });

  const [ingredientFields, setIngredientFields] = useState<IIngredientField[]>(
    initialRecipe?.ingredients
      ? initialRecipe.ingredients.map((ing, index) => ({
          id: index,
          ingredientId: ing.ingredientId,
          quantity: ing.quantity
        }))
      : [{ id: 0, ingredientId: "", quantity: null }]
  );

  const { ingredients } = useIngredientStore();
  const { addRecipe, updateRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleAddIngredientField = () => {
    if (ingredientFields.length < 10 ) {
      setIngredientFields([
        ...ingredientFields,
        { id: ingredientFields.length, ingredientId: "", quantity: null }
      ]);
    }
  };

  const handleRemoveIngredientField = (id: number) => {
    if (ingredientFields.length > 1) {
      setIngredientFields(ingredientFields.filter((field) => field.id !== id));
    }
  };

  const handleIngredientChange = (
    id: number,
    field: keyof IIngredientField,
    value: string | number | null
  ) => {
    setIngredientFields(
      ingredientFields.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      setError(null);

      const result = initialRecipe
        ? await updateRecipe(initialRecipe.id, formData)
        : await addRecipe(formData);

      if (result.success) {
        setIngredientFields([{ id: 0, ingredientId: "", quantity: null }]);
        router.push("/");
        setFormData(initialState);
      } else {
        setError(result.error || "Ошибка при сохранении рецепта");
      }
    });
  };

  return (
    <Form
      className="w-112.5 flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Название */}
      <TextField
        isRequired
        name="name"
        value={formData.name}
        onChange={(val) => setFormData({ ...formData, name: val })}
        className="w-full"
      >
        <Label>Название рецепта</Label>
        <Input placeholder="Введите название рецепта" className="bg-default-100" />
        <FieldError />
      </TextField>

      {/* Описание */}
      <TextField
        name="description"
        value={formData.description}
        onChange={(val) => setFormData({ ...formData, description: val })}
        className="w-full"
      >
        <Label>Описание</Label>
        <Input placeholder="Введите описание (необязательно)" className="bg-default-100" />
      </TextField>

      {/* URL изображения */}
      <TextField
        name="imageUrl"
        type="url"
        value={formData.imageUrl}
        onChange={(val) => setFormData({ ...formData, imageUrl: val })}
        className="w-full"
      >
        <Label>URL изображения</Label>
        <Input placeholder="URL изображения (необязательно)" className="bg-default-100" />
      </TextField>

      {/* Ингредиенты */}
      <div className="space-y-2 w-full">
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-end text-b">
            <Select
              isRequired
              name={`ingredient_${index}`}
              value={field.ingredientId || null}
              onChange={(val: Key | null) =>
                handleIngredientChange(field.id, "ingredientId", val ? String(val) : "")
              }
              placeholder="Выберите ингредиент"
              className="flex-1"
            >
              <Select.Trigger className="bg-default-100">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {ingredients.map((ingredient) => (
                    <ListBox.Item
                      key={ingredient.id}
                      id={ingredient.id}
                      textValue={ingredient.name}
                      className="text-black"
                    >
                      {ingredient.name}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <TextField
              isRequired
              name={`quantity_${index}`}
              type="number"
              value={field.quantity !== null ? field.quantity.toString() : ""}
              onChange={(val) =>
                handleIngredientChange(
                  field.id,
                  "quantity",
                  val ? parseFloat(val) : null
                )
              }
              className="w-30"
            >
              <Input placeholder="Кол-во" className="bg-default-100" min={1} />
              <FieldError />
            </TextField>

            {ingredientFields.length > 1 && (
              <Button
                variant="danger-soft"
                onPress={() => handleRemoveIngredientField(field.id)}
                className="w-12.5"
              >
                -
              </Button>
            )}
          </div>
        ))}

        {ingredientFields.length < 10 && (
          <Button className="bg-green-500/30 hover:bg-green-500/40 text-white"  onPress={handleAddIngredientField}>
            +
          </Button>
        )}
      </div>

      <div className="flex w-full items-center justify-end mt-4">
        <Button className="bg-primary text-white" type="submit" isDisabled={isPending}>
          {initialRecipe ? "Сохранить изменения" : "Добавить рецепт"}
        </Button>
      </div>
    </Form>
  );
};

export default RecipeForm;