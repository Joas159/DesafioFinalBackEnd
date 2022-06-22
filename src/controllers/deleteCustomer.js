const connection = require('../database/connection');

const deleteCustomer = async (req, res) => {
    const { id } = req.params
    

    try {
        const queryDeleteCustomer =  'delete from customers where id = $1'

        const deleteCust = await connection.query(queryDeleteCustomer, [id]);
        console.log(deleteCust);

        if(deleteCust.rowCount === 0){
            return res.status(500).json({ "Message": "Cliente não foi deletado." })
        }
        return res.status(201).json({ "Message": "Cliente deletado com sucesso." });
        
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensagem })
    }
};

module.exports = {
    deleteCustomer
}
      