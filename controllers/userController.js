const User = require('../models/Users');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.json({ msg: "کاربری موجود نیست" });
        }

        return res.json({
            count: users.length,
            data: users
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "خطا در سرور" });
    }
};

const createUser = async (req, res) => {
    try {
        const allowedDomains = [
            "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
            "icloud.com", "aol.com", "protonmail.com", "zoho.com",
            "mail.com", "gmx.com", "yandex.com"
        ];

        const { first_name, last_name, email, phone } = req.body;
        const requireFields = { first_name, last_name, email };
        for (const [key, value] of Object.entries(requireFields)) {
            if (!value) {
                return res.status(400).json({ msg: `${key} ارسال نشده` });
            }
        }

        const emailParts = email.split("@");
        if (emailParts.length !== 2 || !allowedDomains.includes(emailParts[1])) {
            return res.status(400).json({ msg: "دامنه ایمیل معتبر نیست" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ msg: "اطلاعات وارد شده از  قبل ثبت شده اند" });
        }
        const wallet_count = req.body.wallet_count || 0;
        const newUser = await User.create({ first_name, last_name, email, phone, wallet_count });

        return res.status(201).json({
            msg: "کاربر با موفقیت ساخته شد !",
            user: newUser
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "خطای سرور", error });
    }
}

module.exports = { getAllUsers, createUser };
