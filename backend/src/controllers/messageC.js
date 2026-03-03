const cloudinary = require("../lib/cloudinary");
const { getReceiverSocketId, io } = require("../lib/socket");
const Message = require("../models/Message");
const User = require("../models/User");



exports.getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const contacts = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


exports.getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: id },
                { senderId: id, receiverId: loggedInUserId }
            ]
        }).sort({ createdAt: 1 });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


exports.sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, image } = req.body;
        const loggedInUserId = req.user._id;
        if (!text && !image) {
            return res.status(400).json({ message: "Message is required" });
        }
        if (loggedInUserId.equals(id)) {
            return res.status(400).json({ message: "You cannot send message to yourself" });
        }
        const receiver = await User.findById(id);
        if (!receiver) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        let imageUrl;
        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image);
            imageUrl = uploadResult.secure_url;
        }
        const message = await Message.create({
            senderId: loggedInUserId,
            receiverId: id,
            text,
            image: imageUrl
        });

        const receiverSocketId = getReceiverSocketId(id);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);
        }
        return res.status(201).json(message);
    } catch (error) {
        console.log("Error in sending message", error);
        return res.status(500).json({ message: error.message });
    }
}


exports.getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        }).sort({ createdAt: -1 });
        const chatPartnerIds = messages.map(message => {
            return message.senderId.toString() === loggedInUserId.toString() ? message.receiverId.toString() : message.senderId.toString();
        });
        const uniqueChatPartnerIds = [...new Set(chatPartnerIds)];


        const chatPartners = await User.find({ _id: { $in: uniqueChatPartnerIds } }).select("-password");

        // Sort chatPartners based on the order of uniqueChatPartnerIds
        const sortedChatPartners = chatPartners.sort((a, b) => {
            return uniqueChatPartnerIds.indexOf(a._id.toString()) - uniqueChatPartnerIds.indexOf(b._id.toString());
        });

        return res.status(200).json(sortedChatPartners);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}