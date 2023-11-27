import Link from "next/link";
import Image from "next/image";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchProducts, fetchDisplayProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions";
import { searchProp } from "@/types";

const ProductsPage = async ({ searchParams }: { searchParams: searchProp }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  let count;
  let products;
  try {
    if (q === "") {
      const result = await fetchDisplayProducts();
      count = result.count;
      products = result.products;
    } else {
      const result = await fetchProducts(q, page);
      count = result.count;
      products = result.products;
    }

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a product..." />
          <Link href="/dashboard/products/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>

        {products.length < 1 ? (
          <p>No products found.</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Price</td>
                  <td>Created At</td>
                  <td>Stock</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.product}>
                        {/* <Image
                          src={product.image || "/noproduct.jpg"}
                          alt=""
                          width={40}
                          height={40}
                          className={styles.productImage}
                        /> */}
                        {product.title}
                      </div>
                    </td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.createdAt?.toString().slice(4, 16)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className={styles.buttons}>
                        <Link href={`/dashboard/products/${product.id}`}>
                          <button className={`${styles.button} ${styles.view}`}>
                            View
                          </button>
                        </Link>
                        <form
                          onSubmit={async (e) => {
                            "use server";
                            e.preventDefault()
                            await deleteProduct();
                          }}
                        >
                          <input type="hidden" name="id" value={product.id} />
                          <button
                            type="submit"
                            onClick={async (e) => {
                              "use server";
                              e.preventDefault()
                              await deleteProduct(e);
                            }}
                            className={`${styles.button} ${styles.delete}`}
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination count={count} />
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle error appropriately, e.g., show an error message to the user.
    return <p>Error fetching products</p>;
  }
};

export default ProductsPage;
