import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Spinner from "./Spinner";

function FormCategory({
  setCategoryForm,
  getCategories,
  categories,
  setCategory: setExistedCategory,
  _id,
  name: existedName,
  parent: existedParent,
  properties: existedProperties,
}) {
  const [name, setName] = useState(existedName || "");
  const [parent, setParent] = useState(existedParent?._id || "");
  const [properties, setProperties] = useState(existedProperties || []);
  const [loading, setLoading] = useState(false);

  const clearFields = () => {
    setExistedCategory(null);
    setCategoryForm(false);
    setName("");
    setParent("");
    setProperties([]);
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
  const saveCategory = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    const data = {
      name,
      parent,
      properties: properties.map((item) => ({
        name: item.name,
        values: item.values.split(","),
      })),
    };

    if (!_id) {
      await axios.post("/api/categories", data);
    } else {
      data._id = _id;
      await axios.put("/api/categories", data);
    }

    setLoading(false);
    toast.success("Save Category Successful", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    clearFields();
    getCategories();
  };

  return (
    <form onSubmit={saveCategory} className="relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div className="bg-zinc-200 p-2">
        <label>
          {existedName ? `Edit Category ${existedName}` : "New Category name"}
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mb-0"
          />
          <select
            onChange={(ev) => setParent(ev.target.value)}
            value={parent}
            className="mb-0"
          >
            <option>No parent category</option>
            {categories &&
              categories.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="bg-zinc-200 p-2 mb-2">
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

export default FormCategory;
