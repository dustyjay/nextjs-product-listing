export const fetchListing = async () => {
  return await fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      throw err;
    });
};

export const fetchCategories = async () => {
  return await fetch('https://fakestoreapi.com/products/categories')
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      throw err;
    });
};

export const fetchCategoryListing = async (category: string) => {
  return await fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      throw err;
    });
};
