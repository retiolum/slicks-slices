import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((carry, orderItem) => {
    const pizza = pizzas.find((pizzaItem) => pizzaItem.id === orderItem.id);
    const price = calculatePizzaPrice(pizza.price, orderItem.size);

    return carry + price;
  }, 0.0);
}
