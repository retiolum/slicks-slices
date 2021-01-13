import Img from 'gatsby-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((orderItem, index) => {
        const pizza = pizzas.find((pizzaItem) => pizzaItem.id === orderItem.id);
        return (
          <MenuItemStyles key={`${orderItem.index}-${index}`}>
            <Img
              fluid={pizza.image.asset.fluid}
              width="50"
              height="50"
              alt={pizza.name}
            />
            <h2>
              {pizza.name} {orderItem.size}
            </h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, orderItem.size))}
              <button
                type="button"
                className="remove"
                title={`Remove "${pizza.name} ${orderItem.size}" from order`}
                onClick={() => {
                  removeFromOrder(index);
                }}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
