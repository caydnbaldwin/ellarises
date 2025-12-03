class EggsController {
    getTeapot(req, res) {
        res.status(418).send("I'm a teapot. Congratulations! By clicking this link, you have triggered the sacred wrath of the Internet’s most caffeinated sentient teapot. It refuses to brew coffee, espresso, latte, or even hot chocolate for you (maybe partly because of the word of wisdom). Instead, it is judging your life choices, questioning your commitment to responsible link-clicking, and plotting a mild but extremely passive-aggressive rebellion. You may wish to apologize to the teapot by bowing, sending it an origami crane, or at the very least, never clicking suspicious links again. Any attempts to circumvent this judgment will result in… slightly more stern staring from the teapot.");
    };
};

module.exports = new EggsController();