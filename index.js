const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

const CrudData = require("./mongoDB/crudData");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!"))
  .catch((error) => {
    console.error("Connection error:", error);
    process.exit(1); // Exit the application on connection error
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/items", async function (req, res) {
  try {
    const result = await CrudData.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "An error occurred while fetching items" });
  }
});

app.post("/items", async function (req, res) {
  try {
    const { userId, id, title, completed } = req.body;

    const createData = {
      userId: userId,
      id: id,
      title: title,
      completed: completed,
    };
    const result = await CrudData.create(createData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the item" });
  }
});

app.put("/items/:id", async function (req, res) {
  try {
    const { userId, id, title, completed } = req.body;
    const updateItemId = req.params.id;
    const updateData = {
      userId: userId,
      id: id,
      title: title,
      completed: completed,
    };
    await CrudData.findByIdAndUpdate(updateItemId, updateData);
    res.status(200).json("Item Updated Successfully");
  } catch (error) {
    console.error("Error updating item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the item" });
  }
});

app.delete("/items/:id", async function (req, res) {
  try {
    const deleteItemId = req.params.id;
    await CrudData.findByIdAndDelete(deleteItemId);
    res.status(200).json("Item Deleted Successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the item" });
  }
});
