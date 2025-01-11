import ServiceSchema from "../../model/admin/servicesSchema.js";

// Create a new service

const createService = async (req, res) => {
  const { name, description, price, duration } = req.body;

  try {
    const newService = new ServiceSchema({
      name,
      duration,
      price,
    });

    await newService.save();

    res
      .status(201)
      .json({ message: "Service saved successfully", data: newService });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getService = async (req, res) => {
  try {
    const service = await ServiceSchema.find();
    if (!service) return res.status(404).json({ message: "Service not found" });
    res
      .status(200)
      .json({ message: "Service loaded successfully", data: service });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, price } = req.body;
    const updatedService = await ServiceSchema.findByIdAndUpdate(
      id,
      { name, duration, price },
      { new: true }
    );
    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });
    res
      .status(200)
      .json({ message: "Service updated successfully", data: updatedService });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteService = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedService = await ServiceSchema.findByIdAndDelete(id);
      if (!deletedService)
        return res.status(404).json({ message: "Service not found" });
      res
       .status(200)
       .json({ message: "Service deleted successfully", data: deletedService });
    } catch (error) {
      res.status(500).send(error.message);
    }
}

export default { createService, getService, updateService, deleteService};
