// Import necessary modules or dependencies
const Vote = require('../models/Vote'); // Assuming you have a Vote model

// Controller function to handle voting
exports.vote = async (req, res) => {
    try {
        // Extract necessary data from the request body or params
        const { postId, userId, value } = req.body;

        // Check if the user has already voted on this post
        const existingVote = await Vote.findOne({ postId, userId });

        if (existingVote) {
            // Update the existing vote
            existingVote.value = value;
            await existingVote.save();
            res.status(200).json({ message: 'Vote updated successfully' });
        } else {
            // Create a new vote
            const newVote = new Vote({ postId, userId, value });
            await newVote.save();
            res.status(201).json({ message: 'Vote recorded successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get the total votes for a post
exports.getVotes = async (req, res) => {
    try {
        // Extract necessary data from the request params
        const postId = req.params.postId;

        // Find all votes for the specified post
        const votes = await Vote.find({ postId });

        // Calculate total votes
        let totalVotes = 0;
        votes.forEach(vote => {
            totalVotes += vote.value;
        });

        res.status(200).json({ totalVotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
