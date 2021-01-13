import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((orderItem) => {
    const pizza = pizzas.find((singlePizza) => singlePizza.id === orderItem.id);
    return {
      ...orderItem,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, orderItem.size)),
    };
  });
}
