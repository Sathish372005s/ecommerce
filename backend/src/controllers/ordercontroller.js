export const createOrder = async (req, res) => {
  try {
    // TODO
  } catch (error) {
    res.status(500).json({ message: "Create order failed", error });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    // TODO
  } catch (error) {
    res.status(500).json({ message: "Fetch orders failed", error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    // TODO (admin)
  } catch (error) {
    res.status(500).json({ message: "Fetch all orders failed", error });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    // TODO
  } catch (error) {
    res.status(500).json({ message: "Update status failed", error });
  }
};