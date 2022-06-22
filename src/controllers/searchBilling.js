const connection = require('../database/connection');

const searchBilling = async (req, res) => {
    const { search } = req.params

    try {
        if (search !== '') {
            const queryClient = 'select billing.id, name, billing.customers, description, billing.status, amount, due  from billing join customers on customers = customers.id where customers.name ilike $1';
            const list = await connection.query(queryClient, [search + "%"]);

            if (list.rowCount > 0) {
                return res.status(201).json({ "Message": list.rows });
            }
        }

        const searchNumber = Number(search);

        let i = searchNumber + 1;

        if (searchNumber !== '' && !isNaN(searchNumber)) {

            const querySearchBilling = 'select * from billing where id = $1';
            const list = await connection.query(querySearchBilling, [searchNumber]);

            if (list.rowCount > 0) {
                return res.status(201).json({ "Message": list.rows });
            }

        }
        return res.status(400).json({ "Message": "Cobrança inexistente" });
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error })
    }
};

module.exports = {
    searchBilling
}
