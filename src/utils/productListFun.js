export const getGroupedProducts = cartItems => {
  const groupedProducts = {};

  cartItems.forEach(product => {
    if (groupedProducts[product.name]) {
      groupedProducts[product.name] = {
        ...groupedProducts[product.name],
        quantity: groupedProducts[product.name].quantity + product.quantity,
        price:
          groupedProducts[product.name].price +
          product.price * product.quantity,
      };
    } else {
      groupedProducts[product.name] = {
        ...product,
        quantity: product.quantity,
      };
    }
  });

  return groupedProducts;
};

export const handleAddAndSubtractItem = (itemName, operator, setCartItems) => {
  setCartItems(prevItems => {
    return prevItems
      .map(item => {
        if (item.name === itemName) {
          const updatedQuantity =
            operator === "+" ? item.quantity + 1 : item.quantity - 1;

          if (updatedQuantity === 0) {
            // Remove the item from the array if the quantity becomes zero
            return null;
          }

          return {
            ...item,
            quantity: updatedQuantity,
          };
        }
        return item;
      })
      .filter(item => item !== null);
  });
};

export const handleAddToCart = (product, setCartItems, cartItems) => {
  const existingProduct = cartItems.find(item => item.id === product.id);
  if (existingProduct) {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  } else {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
};
