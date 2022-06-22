const connection = require('../database/connection');

const searchCustomer = async (req, res) => {
    const { search } = req.params

    try {

        if (search !== ''){

            const queryListCustomer = 'select * from customers where cpf ilike $1';
            const list = await connection.query(queryListCustomer, [search + '%']);
            if (list.rowCount > 0){
               return res.status(201).json({ "Message": list.rows}); 
            }
        }
        if (search !== ''){
            console.log(search);
            const queryListCustomer = 'select * from customers where name ilike $1';
            const list = await connection.query(queryListCustomer, [search + '%']);
            if (list.rowCount > 0){
               return res.status(201).json({ "Message": list.rows}); 
            }
        }
        if (search !== ''){
            const queryListCustomer = 'select * from customers where email ilike $1';
            const list = await connection.query(queryListCustomer, [search + '%']);
            if (list.rowCount > 0){
               return res.status(201).json({ "Message": list.rows}); 
            }
        }
        return res.status(400).json({ "Message": "Cliente inexistente"}); 
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensagem })
    }
};

module.exports = {
    searchCustomer
}
