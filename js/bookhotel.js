
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(
        "mongodb+srv://tceaswin:Aswin123@cluster0.fltbugm.mongodb.net/boookngo?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    city: String,
    date: String,
    hotel: String,
    createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookingSchema);

// Transport Booking Schema
const transportSchema = new mongoose.Schema({
    name: String,
    type: String,
    from: String,
    to: String,
    time: String,
    createdAt: { type: Date, default: Date.now }
});

const Transport = mongoose.model("Transport", transportSchema);

// CREATE
app.post("/api/bookings", async (req, res) => {
    try {
        const newBooking = new Book(req.body);
        await newBooking.save();
        res.status(201).json({ message: "Booking Saved", booking: newBooking });
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// READ ALL
app.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await Book.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// READ ONE
app.get("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Book.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Not found" });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// UPDATE
app.put("/api/bookings/:id", async (req, res) => {
    try {
        const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Booking Updated", booking: updated });
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// DELETE
app.delete("/api/bookings/:id", async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Booking Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});



// TRANSPORT CRUD ENDPOINTS
// CREATE
app.post("/api/transports", async (req, res) => {
    try {
        const newTransport = new Transport(req.body);
        await newTransport.save();
        res.status(201).json({ message: "Transport Booking Saved", transport: newTransport });
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// READ ALL
app.get("/api/transports", async (req, res) => {
    try {
        const transports = await Transport.find();
        res.json(transports);
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// READ ONE
app.get("/api/transports/:id", async (req, res) => {
    try {
        const transport = await Transport.findById(req.params.id);
        if (!transport) return res.status(404).json({ message: "Not found" });
        res.json(transport);
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// UPDATE
app.put("/api/transports/:id", async (req, res) => {
    try {
        const updated = await Transport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Transport Booking Updated", transport: updated });
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// DELETE
app.delete("/api/transports/:id", async (req, res) => {
    try {
        const deleted = await Transport.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Transport Booking Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// Root route for API status
app.get('/', (req, res) => {
    res.send('BookNGo API is running. Available endpoints: \n' +
        'POST /api/bookings, GET /api/bookings, GET /api/bookings/:id, PUT /api/bookings/:id, DELETE /api/bookings/:id\n' +
        'POST /api/transports, GET /api/transports, GET /api/transports/:id, PUT /api/transports/:id, DELETE /api/transports/:id');
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
