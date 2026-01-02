import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "./App";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ProductsMain from "./pages/ProductsMain";
import ProductCategory from "./pages/ProductCategory";
import ProductPage from "./pages/ProductPage";
import Pylontech from "./pages/Pylontech";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Locations from "./pages/Locations";
import LocationPage from "./pages/LocationPage";
import KnowledgeHub from "./pages/knowledge";
import KnowledgeArticlePage from "./pages/knowledge/KnowledgeArticlePage";
import Pricing from "./pages/Pricing";
import Calculator from "./pages/Calculator";
import NotFound from "./pages/NotFound";
import AdminLocalRoutes from "./admin/AdminLocalRoutes";
import { allProducts } from "@/data/products";
import { pillarPages, supportingArticles } from "@/data/articles";
import { citySlugs } from "./pages/LocationPage";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Index },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      // Products Routes
      { path: "products", Component: ProductsMain },
      {
        path: "products/:category",
        Component: ProductCategory,
        getStaticPaths: () => {
          const categories = Array.from(new Set(allProducts.map((p) => p.category)));
          return categories.map((category) => `products/${category}`);
        },
      },
      {
        path: "products/:category/:slug",
        Component: ProductPage,
        getStaticPaths: () =>
          allProducts.map((product) => `products/${product.category}/${product.slug}`),
      },
      { path: "pylontech", Component: Pylontech },
      { path: "contact", Component: Contact },
      { path: "projects", Component: Projects },
      { path: "locations", Component: Locations },
      {
        path: "locations/:citySlug",
        Component: LocationPage,
        getStaticPaths: () =>
          citySlugs.filter(Boolean).map((slug) => `locations/${slug}`),
      },
      // Knowledge Hub Routes
      { path: "knowledge", Component: KnowledgeHub },
      {
        path: "knowledge/:slug",
        Component: KnowledgeArticlePage,
        getStaticPaths: () => {
          const slugs = [
            ...pillarPages.map((p) => p.slug),
            ...supportingArticles.map((a) => a.slug),
          ].filter(Boolean);
          return slugs.map((slug) => `knowledge/${slug}`);
        },
      },
      // Pricing & Calculator
      { path: "pricing", Component: Pricing },
      { path: "calculator", Component: Calculator },
      // Admin Local Routes - DEV only
      ...(import.meta.env.DEV
        ? ([{ path: "admin-local/*", Component: AdminLocalRoutes }] as RouteRecord[])
        : []),
      // Catch-all route
      { path: "*", Component: NotFound },
    ],
  },
];

export default routes;
