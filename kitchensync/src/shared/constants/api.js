export const API_ROUTES = {
  BASE_URL: import.meta.env.VITE_API_URL,
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  TABLES: {
    GET_ALL: '/kitchen/tables',
    CREATE: '/kitchen/tables',
    GET_BY_NUMBER: (tableNumber) => `/kitchen/tables/${tableNumber}`,
    UPDATE: (tableNumber) => `/kitchen/tables/${tableNumber}`,
    DELETE: (tableNumber) => `/kitchen/tables/${tableNumber}`
  },
  DISHES: {
    GET_ALL: '/kitchen/dishes/getAll',
    GET_BY_NAME: '/kitchen/dishes/getByName',
    CREATE: '/kitchen/dishes/create',
    UPDATE: (id) => `/kitchen/dishes/update?id=${id}`,
    DELETE: (id) => `/kitchen/dishes/delete?id=${id}`
  },
  ORDERS: {
    CREATE: '/kitchen/orders/create',
    GET_ALL: '/kitchen/orders/getAll?page=0&size=10000',
    GET_BY_ID: '/kitchen/orders/getById',
    GET_BY_WAITER: (waiterId) => `/kitchen/orders/waiter/${waiterId}?limit=1000`,
    UPDATE: (orderId) => `/kitchen/orders/update?id=${orderId}`,
    DELETE: (orderId) => `/kitchen/orders/delete?id=${orderId}`
  },
  ORDER_DISHES: {
    CREATE: '/kitchen/orderDishes',
    GET_BY_ORDER: '/kitchen/orderDishes/orderId',
    GET_BY_ID: (orderDishId) => `/kitchen/orderDishes/getById?id=${orderDishId}`,
    GET_BY_ORDER_ID: (orderId) => `/kitchen/orderDishes/orderId?orderId=${orderId}`,
    UPDATE: (orderDishId) => `/kitchen/orderDishes/${orderDishId}`,
    DELETE: (orderDishId) => `/kitchen/orderDishes/delete?id=${orderDishId}`,
    DELETE_BY_ORDER: '/kitchen/orderDishes/delete/orderId'
  }
}