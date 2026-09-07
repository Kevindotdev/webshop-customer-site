import {
  Laptop,
  Shirt,
  Footprints,
  Watch,
  House,
  Sparkles,
  Car,
  Dumbbell,
  Utensils,
} from "lucide-react";

// Group API categories into broader storefront categories for the customer UI.
export const storeCategories = [
  {
    name: "Elektronik",
    icon: Laptop,
    slugs: [
      "laptops",
      "smartphones",
      "tablets",
      "mobile-accessories",
    ],
  },
  {
    name: "Kläder",
    icon: Shirt,
    slugs: [
      "mens-shirts",
      "tops",
      "womens-dresses",
    ],
  },
  {
    name: "Skor",
    icon: Footprints,
    slugs: [
      "mens-shoes",
      "womens-shoes",
    ],
  },
  {
    name: "Klockor & Accessoarer",
    icon: Watch,
    slugs: [
      "mens-watches",
      "womens-watches",
      "sunglasses",
      "womens-jewellery",
      "womens-bags",
    ],
  },
  {
    name: "Hem & Inredning",
    icon: House,
    slugs: [
      "furniture",
      "home-decoration",
      "kitchen-accessories",
    ],
  },
  {
    name: "Skönhet",
    icon: Sparkles,
    slugs: [
      "beauty",
      "fragrances",
      "skin-care",
    ],
  },
  {
    name: "Mat & Dryck",
    icon: Utensils,
    slugs: [
      "groceries",
    ],
  },
  {
    name: "Fordon",
    icon: Car,
    slugs: [
      "motorcycle",
      "vehicle",
    ],
  },
  {
    name: "Sport",
    icon: Dumbbell,
    slugs: [
      "sports-accessories",
    ],
  },
];