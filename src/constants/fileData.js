export const csvFiles = [
  {
    name: "employees",
    file: "data/employees.csv",
  },
  {
    name: "products",
    file: "data/products.csv",
  },
  {
    name: "restaurants",
    file: "data/restaurants.csv",
  },
  {
    name: "recipes",
    file: "data/recipes.csv",
  },
  {
    name: "orders",
    file: "data/orders.csv",
  },
];

export const tableConfigs = {
  employees: {
    title: "Employees",
    icon: "👥",
    color: "blue",
    searchFields: ["name", "department", "location", "skills"],
    filterFields: {
      department: {
        type: "select",
        values: ["Engineering", "Marketing", "Sales", "HR"],
      },
      status: { type: "select", values: ["Active", "Inactive"] },
      salary: { type: "range", min: 50000, max: 100000 },
      experience: { type: "range", min: 1, max: 10 },
    },
  },
  products: {
    title: "Products",
    icon: "📦",
    color: "green",
    searchFields: ["name", "category", "brand", "description"],
    filterFields: {
      category: { type: "select", values: ["Food", "Electronics"] },
      brand: {
        type: "select",
        values: ["Italian Kitchen", "TechCorp", "GamerGear", "Tropical Bites"],
      },
      price: { type: "range", min: 0, max: 100 },
      rating: { type: "range", min: 1, max: 5, step: 0.1 },
    },
  },
  restaurants: {
    title: "Restaurants",
    icon: "🍽️",
    color: "purple",
    searchFields: ["name", "cuisine", "location", "specialty"],
    filterFields: {
      cuisine: { type: "select", values: ["Italian", "American", "Japanese"] },
      price_range: { type: "select", values: ["$", "$$", "$$$"] },
      delivery: { type: "select", values: ["Yes", "No"] },
      rating: { type: "range", min: 1, max: 5, step: 0.1 },
    },
  },
  recipes: {
    title: "Recipes",
    icon: "📝",
    color: "orange",
    searchFields: ["name", "category", "ingredients", "type"],
    filterFields: {
      category: { type: "select", values: ["Italian", "Dessert", "Salad"] },
      difficulty: { type: "select", values: ["Easy", "Medium", "Hard"] },
      type: {
        type: "select",
        values: ["Base", "Sauce", "Main", "Dessert", "Salad"],
      },
      prep_time: { type: "range", min: 0, max: 200 },
      serves: { type: "range", min: 1, max: 10 },
    },
  },
  orders: {
    title: "Orders",
    icon: "📋",
    color: "red",
    searchFields: ["customer", "item", "restaurant"],
    filterFields: {
      status: {
        type: "select",
        values: ["Delivered", "Preparing", "Cancelled"],
      },
      total: { type: "range", min: 0, max: 50 },
    },
  },
};
