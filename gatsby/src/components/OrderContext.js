import React, { useState, useEffect } from 'react';

const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState([]);

  function saveOrder(data) {
    setOrder(data);
    if ('sessionStorage' in window) {
      window.sessionStorage.setItem('order', JSON.stringify(data));
    }
  }

  useEffect(() => {
    if ('sessionStorage' in window) {
      if (window.sessionStorage.getItem('order') !== null) {
        setOrder(JSON.parse(window.sessionStorage.getItem('order')));
      }
    }
  }, []);

  return (
    <OrderContext.Provider value={[order, saveOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
