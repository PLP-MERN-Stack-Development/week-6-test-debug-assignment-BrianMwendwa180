const Bug = require("../models/Bug");

// POST /api/bugs
exports.createBug = async (req, res) => {
    const newBug = await Bug.create({ ...req.body, owner: req.user.id });
    res.json(newBug);
};

// GET /api/bugs/me
exports.getMyBugs = async (req, res) => {
    const bugs = await Bug.find({ owner: req.user.id });
    res.json(bugs);
};

// GET /api/bugs/all
exports.getAllBugs = async (req, res) => {
    const bugs = await Bug.find().populate("owner", "username email");
    res.json(bugs);
};

// PUT /api/bugs/:id
exports.updateBug = async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);

        if (!bug) {
            return res.status(404).json({ message: "Bug not found" });
        }

        // Check if user owns the bug or is admin
        if (bug.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update this bug" });
        }

        const updatedBug = await Bug.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedBug);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/bugs/:id
exports.deleteBug = async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);

        if (!bug) {
            return res.status(404).json({ message: "Bug not found" });
        }

        // Check if user owns the bug or is admin
        if (bug.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this bug" });
        }

        await Bug.findByIdAndDelete(req.params.id);
        res.json({ message: "Bug deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
