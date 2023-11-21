import { updateProduct } from "@/app/lib/actions";
import { fetchProduct } from "@/app/lib/data";
import { Product } from "@/app/lib/models";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import { ProductProp } from "@/types";
import Image from "next/image";

const SingleProductPage = async ({ params }: { params: ProductProp }) => {
  const { id } = params;
  const product: ProductProp | null = await fetchProduct(id);
  if (!product) {
    // Handle the case when the product is null
    return <div>No product found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price.toString()} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
        
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            placeholder={product.description}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
