import { useEffect, useState } from "react";

// import { products } from "@/utils/data";
import FormProduct from "@/components/FormProduct";
import axios from "axios";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [productForm, setProductForm] = useState(false);

  const editProduct = (item) => {
    item.properties =
      item.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      })) ?? [];

    setProduct(item);
    setProductForm(true);
  };
  const removeProduct = async (item) => {
    const { _id } = item;
    await axios.delete(`/api/products?id=${_id}`);
    getProducts();
  };
  const getProducts = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/products");
    setProducts(data);
    setLoading(false);
  };
  const getCategories = async () => {
    const { data } = await axios.get("/api/categories");
    setCategories(data);
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <main>
      <div className="flex justify-between items-center">
        <h1>Products</h1>
        {!productForm && (
          <button
            type="button"
            onClick={() => {
              setProductForm(true);
            }}
            className="btn-primary"
          >
            Add new product
          </button>
        )}
      </div>

      {productForm && (
        <FormProduct
          setProductForm={setProductForm}
          getProducts={getProducts}
          categories={categories}
          setProduct={setProduct}
          {...product}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : products?.length > 0 ? (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Product name</td>
              <td>Category name</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item?.category?.name}</td>
                <td className="flex flex-end items-center gap-1">
                  <button
                    onClick={() => editProduct(item)}
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
                    onClick={() => removeProduct(item)}
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
        <h2>No products founded</h2>
      )}
    </main>
  );
}
