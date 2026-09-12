import EventEmitter from "node:events";

const orderEmitter = new EventEmitter();

orderEmitter.on("newOrder", (order) => {
  console.log(
    `👨‍🍳 Kitchen Alert: Baking a ${order.pizzaType} pizza for ${order.customerName}!`,
  );
  orderEmitter.on("newOrder", (order) => {
    console.log(
      `🚗 Driver Alert: Getting ready to deliver to ${order.customerName}!`,
    );
  });

  const myOrder = { customerName: "Sophia", pizzaType: "Pepperoni" };
  orderEmitter.emit("newOrder", myOrder);
});
