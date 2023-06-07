import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import { toast } from "react-toastify";

import FormCategory from "@/components/FormCategory";
import Spinner from "@/components/Spinner";

function Categories({ swal }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState(false);

  const editCategory = (item) => {
    item.properties =
      item.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      })) ?? [];

    setCategory(item);
    setCategoryForm(true);
  };
  const removeCategory = async (item) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `You want delete the "${item.name}"`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (res) => {
        if (res.isConfirmed) {
          setLoading(true);
          const { _id } = item;
          await axios.delete(`api/categories?id=${_id}`);

          setLoading(false);
          toast.success("Deleted Successful", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          getCategories();
        }
      });
  };
  const getCategories = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/categories");
    setCategories(data);
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <main>
      <div className="flex justify-between items-center">
        <h1>Categories</h1>
        {!categoryForm && (
          <button
            type="button"
            onClick={() => {
              setCategoryForm(true);
            }}
            className="btn-primary"
          >
            Add new category
          </button>
        )}
      </div>

      {categoryForm && (
        <FormCategory
          setCategoryForm={setCategoryForm}
          getCategories={getCategories}
          categories={categories}
          setCategory={setCategory}
          {...category}
        />
      )}

      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner />
          <span>Loading...</span>
        </div>
      ) : categories?.length > 0 ? (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent name</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {categories.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item?.parent?.name}</td>
                <td className="flex flex-end items-center gap-1">
                  <button
                    onClick={() => editCategory(item)}
                    className="btn-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    Edit
                  </button>

                  <button
                    onClick={() => removeCategory(item)}
                    className="btn-red"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No categories founded</h2>
      )}
    </main>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
