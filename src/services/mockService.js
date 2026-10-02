function wait(value, delay = 650) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), delay)
  })
}

export const mockService = {
  login: ({ email }) => wait({ email, authenticated: true }),
  register: ({ email }) => wait({ email, registered: true }),
  contact: (message) =>
    wait({ messageId: `message-${Date.now()}`, received: Boolean(message) }),
  newsletter: (email) => wait({ email, subscribed: true }),
  checkout: (order) =>
    wait({ orderId: `order-${Date.now()}`, total: order.total }),
}