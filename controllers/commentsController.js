const Comment = require('../models/Comments');

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        if (comments.length === 0) {
            return res.json({ msg: 'کامنتی موجود نیست' })
        }
        return res.json({ comments })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "خطا در سرور" });
    }
}

const createComment = async (req, res) => {
    try {
        const { user_name, rating, comment } = req.body;
        const requireFields = { user_name, rating, comment };
        for (const [key, value] of Object.entries(requireFields)) {
            if (!value) {
                return res.status(400).json({ msg: `${key} ارسال نشده` });
            }
        }
        const newComment = await Comment.create(requireFields);
        return res.status(201).json({ msg: "کامنت با موفقیت اضافه شد !" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "خطا در سرور" });
    }
}

module.exports = { getAllComments , createComment};