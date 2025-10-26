const Ticket = require("../models/Ticket");
const User = require("../models/Users");
const jalaali = require('jalaali-js');
const { Op } = require('sequelize');

const BuyTicketController = async (req, res) => {
    try {
        const { id, buyer_email, origin, destination, ticket_time, amount_paid, ticket_type, passengers_amount } = req.body;
        const requireFields = { id, buyer_email, origin, destination, ticket_time, amount_paid, ticket_type, passengers_amount };
        for (const [key, value] of Object.entries(requireFields)) {
            if (!value) {
                return res.status(400).json({ msg: `${key} ارسال نشده` });
            }
        }
        const allowedTypes = ['plain', 'train', 'bus'];
        if (!allowedTypes.includes(ticket_type)) {
            return res.status(404).json({ msg: "نوع بلیط معتبر نیست" });
        }
        const createTicket = await Ticket.create({ buyer_email, origin, destination, ticket_time, amount_paid, ticket_type, passengers_amount });
        if (createTicket) {
            const date = new Date();
            const jDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());

            const jy = jDate.jy;
            const jm = jDate.jm < 10 ? '0' + jDate.jm : jDate.jm;
            const jd = jDate.jd < 10 ? '0' + jDate.jd : jDate.jd;

            return res.status(201).json({
                msg: "بلیط شما با موفقیت خریداری شد",
                buy_time: `${jy}/${jm}/${jd}`
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "خطای سرور", error })
    }
}

const findTicketByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ msg: "ایمیل ارسال نشده است." });
        }

        const tickets = await Ticket.findAll({
            where: { buyer_email: email }
        });


        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ msg: "تیکتی برای این ایمیل پیدا نشد" });
        }

        return res.status(200).json({ tickets });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "خطای سرور", error: error.message });
    }
};

const cancellTicket = async (req, res) => {
    try {
        const { id, email } = req.body;

        if (!id || !email) {
            return res.status(400).json({ msg: "شناسه یا ایمیل ارسال نشده است." });
        }

        // پیدا کردن بلیط
        const ticket = await Ticket.findOne({
            where: {
                id: id,
                buyer_email: email
            }
        });

        if (!ticket) {
            return res.status(404).json({ msg: "بلیطی با این مشخصات پیدا نشد." });
        }

          const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ msg: "کاربری با این ایمیل پیدا نشد." });
        }
        const amountToRefund = ticket.amount_paid;

        user.wallet_count = (user.wallet_count || 0 + amountToRefund);
        await user.save();


        // حذف بلیط
        await ticket.destroy();

           return res.status(200).json({
            msg: "بلیط با موفقیت کنسل شد و مبلغ به ولت کاربر اضافه شد",
            refunded_amount: amountToRefund,
            wallet_count: user.wallet_count
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "خطای سرور", error });
    }
};






module.exports = { BuyTicketController, findTicketByEmail , cancellTicket};