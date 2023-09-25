import { useParams } from "react-router-dom";
import { useProducts } from "../../Context/StateContext";
import { Link } from "react-router-dom"; // Uncomment this import if needed

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, isLoading } = useProducts(); // Added isLoading

  // Find the product by id
  const product = products.find((item) => item.id === parseInt(id));

  if (isLoading) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Product not found.
      </section>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-xs"
              src={image}
              alt={title}
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title}
            </h1>
            <div className="text-2xl text-red-500 font-medium mb-6">
              $ {price}
            </div>
            <p className="mb-8">{description}</p>
            <button
              onClick={() => addToCart(product)} // Removed product.id as addToCart does not take an id
              className="bg-primary py-4 px-8 text-white"
            >
              Add to cart
            </button>
            <Link to="/cart">View Cart</Link> {/* Example link */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
