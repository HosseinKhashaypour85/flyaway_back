const ipChecker = async (req, res) => {
    try {
        let userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (userIp === "::1" || userIp === "127.0.0.1") {
            userIp = "8.8.8.8";
        }

        const url = `http://ip-api.com/json/${userIp}`;
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();

        data.isIranian = data.countryCode === "IR";


        res.status(200).json(data);

    } catch (error) {
        console.error("خطا در بررسی IP:", error);
        res.status(500).json({ error: "خطا در ارتباط با سرویس IP" });
    }
};

module.exports = ipChecker;
