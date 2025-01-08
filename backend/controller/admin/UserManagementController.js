import UserManagementSchema from "../../model/admin/UserMAnagementSchema.js";

const saveUser = async (req, res) => {
  const { fullname, email, role, password, status } = req.body;

  await UserManagementSchema.findOne(email)
    .then((data) => {
      return res.status(200).json({ message: "Email already exists" });
    })
    .catch((err) => {
      console.log(err.message);
    });

  if (!fullname || !email || !role || !password || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  if (email) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
  }

  const newUser = new UserManagementSchema({
    fullname,
    email,
    role,
    password,
    status,
  });

  await newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

const getUser = (req, res) => {
  UserManagementSchema.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, role, password, status } = req.body;

  if (!fullname || !email || !role || !password || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await UserManagementSchema.findByIdAndUpdate(
    id,
    { fullname, email, role, password, status },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User update successfully", data: data });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await UserManagementSchema.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export default { saveUser, getUser, updateUser, deleteUser };
