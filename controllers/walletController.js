const User = require("../models/Users");

const addAmountToWallet = async (req, res) => {
    try {
        const { email, amount } = req.body;

        if (!email || !amount) {
            return res.status(400).json({ msg: "ایمیل یا مبلغ ارسال نشده است." });
        }

        // پیدا کردن کاربر
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ msg: "کاربری با این ایمیل پیدا نشد." });
        }

        // اضافه کردن به کیف پول
        user.wallet_count = (user.wallet_count || 0) + Number(amount);
        await user.save();

        return res.status(200).json({
            msg: "کیف پول با موفقیت شارژ شد",
            wallet_count: user.wallet_count
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "خطای سرور", error });
    }
};

const decreaseOfAmount = async (req, res) => {
    try {
        const { email, amount } = req.body;

        if (!email || !amount) {
            return res.status(400).json({ msg: "ایمیل یا مبلغ ارسال نشده است." });
        }
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ msg: "کاربری با این ایمیل پیدا نشد." });
        }
        user.wallet_count = (user.wallet_count || 0) - Number(amount);
        if (user.wallet_count < 0) {
            user.wallet_count = 0;
        }
        await user.save();
        return res.status(201).json({
            msg: "مبلغ مورد نظر از حساب شما برداشته شد!",
            wallet_count: user.wallet_count
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "خطای سرور", error });
    }
}

module.exports = { addAmountToWallet , decreaseOfAmount };
