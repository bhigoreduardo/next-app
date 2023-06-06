import axios from "axios";
import { useEffect, useState } from "react";

function FormProduct({
  setProductForm,
  getProducts,
  categories,
  setProduct,
  _id,
  title: existedTitle,
  category: existedCategory,
  description: existedDescription,
  price: existedPrice,
  images: existedImages,
  properties: existedProperties,
  categoryProperties: existedCategoryProperties,
}) {
  const [title, setTitle] = useState(existedTitle || "");
  const [category, setCategory] = useState(existedCategory?._id || "");
  const [description, setDescription] = useState(existedDescription || "");
  const [price, setPrice] = useState(existedPrice || "");
  const [images, setImages] = useState(existedImages || []);
  const [properties, setProperties] = useState(existedProperties || []);
  const [categoryProperties, setCategoryProperties] = useState(
    existedCategoryProperties || {}
  );
  const [categoryPropertiesData, setCategoryPropertiesData] = useState([]);

  const clearFields = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setPrice("");
    setImages([]);
    setProperties([]);
    setCategoryProperties({});
    setCategoryPropertiesData([]);
    setProduct(null);
    setProductForm(false);
  };
  const addProperty = () => {
    setProperties((prevState) => [...prevState, { name: "", values: "" }]);
  };
  const removeProperty = (index) => {
    setProperties((prevState) => prevState.filter((_, i) => i !== index));
  };
  const changePropertyName = (index, value) => {
    setProperties((prevState) => {
      const props = [...prevState];
      props[index].name = value;
      return props;
    });
  };
  const changePropertyValues = (index, value) => {
    setProperties((prevState) => {
      const props = [...prevState];
      props[index].values = value;
      return props;
    });
  };
  const changeCategoryProperty = (key, value) => {
    setCategoryProperties((prevState) => {
      const props = { ...prevState };
      props[key] = value;
      return props;
    });
  };
  const saveproduct = async (ev) => {
    ev.preventDefault();
    const data = {
      title,
      category,
      description,
      price,
      images,
      properties: properties.map((item) => ({
        name: item.name,
        values: item.values.split(","),
      })),
      categoryProperties,
    };

    if (!_id) {
      await axios.post("/api/products", data);
    } else {
      data._id = _id;
      await axios.put("/api/products", data);
    }

    clearFields();
    getProducts();
  };
  useEffect(() => {
    if (category) {
      const properties = [];
      const _category = categories.find(({ _id }) => _id === category);
      properties.push(..._category.properties);

      if (_category?.parent?._id) {
        const parentCategory = categories.find(
          ({ _id }) => _id === _category.parent._id
        );

        if (parentCategory?.properties) {
          properties.push(...parentCategory.properties);
        }
      }

      setCategoryPropertiesData(properties);
    }
  }, [category]);

  return (
    <form onSubmit={saveproduct} className="flex flex-col gap-2">
      <div className="bg-zinc-200 p-2">
        <label>
          {existedTitle ? `Edit Product ${existedTitle}` : "New product name"}
        </label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>

      <div className="bg-zinc-200 p-2">
        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories?.length > 0 &&
            categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="bg-zinc-200 p-2">
        <label>Photos</label>
        {!images?.length && <div>No photos in this product</div>}
      </div>

      <div className="bg-zinc-200 p-2">
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
      </div>

      <div className="bg-zinc-200 p-2">
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
      </div>

      <div className="bg-zinc-200 p-2">
        <div className="flex justify-between items-center mb-2">
          <label>Properties</label>
          <button type="button" className="btn-primary" onClick={addProperty}>
            Add Property
          </button>
        </div>
        {properties?.length > 0 &&
          properties.map((item, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <input
                type="text"
                placeholder="Property name (example, color)"
                value={item.name}
                onChange={(ev) => changePropertyName(i, ev.target.value)}
                className="mb-0"
              />
              <input
                type="text"
                placeholder="Values, comma separated"
                value={item.values}
                onChange={(ev) => changePropertyValues(i, ev.target.value)}
                className="mb-0"
              />
              <button
                type="button"
                onClick={() => removeProperty(i)}
                className="btn-red"
              >
                Remove
              </button>
            </div>
          ))}
      </div>

      {categoryPropertiesData?.length > 0 && (
        <div className="bg-zinc-200 p-2">
          <label>Category Properties</label>
          {categoryPropertiesData.map((item, i) => (
            <div key={i} className="flex gap-2">
              <label className="flex-1">
                {item.name[0].toUpperCase() + item.name.substring(1)}
              </label>
              <select
                className="flex-1"
                onChange={(ev) =>
                  changeCategoryProperty(item.name, ev.target.value)
                }
                value={categoryProperties[item.name]}
              >
                <option value="">Unproperty</option>
                {item.values.map((value, key) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button type="button" className="btn-default" onClick={clearFields}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default FormProduct;
