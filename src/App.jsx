
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import SiteLayout from "./app/Components/layout";
import HomePage from "./app/Components/Homepage";
import ShopPage from "./app/Components/shop/ShopPage";
import CollectionPage from "./app/Components/collections/CollectionsPage";
import ProductPage from "./app/Components/product/ProductPage";

import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import CartPage from "./app/Components/cart/CartPage";
import RegisterPage from "./app/Components/register/RegisterPage.jsx";
import WishlistPage from "./app/Components/wishlist/WishlistPage.jsx";


export default function App() {
  return (
    <>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </SiteLayout>

      <Toaster
        position="bottom-center"
        toastOptions={{ className: "font-sans" }}
      />
    </>
  );
}
