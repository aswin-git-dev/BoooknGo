
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

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model("User", userSchema);

// Booked Tour Schema
const bookedTourSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    tourName: String,
    roomName: String,
    transportMode: String,
    total: Number,
    userid: String,
    createdAt: { type: Date, default: Date.now }
});
const BookedTour = mongoose.model("BookedTour", bookedTourSchema, "bookedtours");

// Booked Hotel Schema
const bookedHotelSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    hotelName: String,
    city: String,
    price: Number,
    userid: String,
    createdAt: { type: Date, default: Date.now }
});
const BookedHotel = mongoose.model("BookedHotel", bookedHotelSchema, "bookedhotels");
// USER ENDPOINTS
app.post("/api/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// BOOKED TOUR ENDPOINTS
app.post("/api/bookedtours", async (req, res) => {
    try {
        const newBookedTour = new BookedTour(req.body);
        await newBookedTour.save();
        res.status(201).json({ message: "Booked Tour Saved", bookedTour: newBookedTour });
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});
app.get("/api/bookedtours", async (req, res) => {
    try {
        const tours = await BookedTour.find();
        res.json(tours);
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

// BOOKED HOTEL ENDPOINTS
app.post("/api/bookedhotels", async (req, res) => {
    try {
        const newBookedHotel = new BookedHotel(req.body);
        await newBookedHotel.save();
        res.status(201).json({ message: "Booked Hotel Saved", bookedHotel: newBookedHotel });
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});
app.get("/api/bookedhotels", async (req, res) => {
    try {
        const hotels = await BookedHotel.find();
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
});

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
