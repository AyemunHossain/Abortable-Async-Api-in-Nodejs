const QueryBuilder = require("../mysql")

const goSleep = async (req, res, next) => {
    try {

        const abortController = new AbortController();
        const { signal } = abortController;

        setTimeout(() => {
            abortController.abort();
        }, 5000);

        const result = await QueryBuilder.executeQuery('SELECT SLEEP(10)', signal)
        res.json(result);


    } catch (err) {
        if (err.name === 'AbortError') {
            res.status(400).json({ message: "Query aborted due to timeout" });
        } else {
            console.log({ err })
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    }
}

module.exports = {
    goSleep
}