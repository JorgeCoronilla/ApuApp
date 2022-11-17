

const adminController = {
    datosAdmin: async (req, res) => {
        const { user } = req.params;
        console.log(user);
        const connection = require('../ddbb/mysql')
        let query = 'select * from app_admins where id_admin = 1;';
        connection.query(query, (err, req) => {
            if (err) throw err;          
            console.log(req);
            console.log(req[0].email);
            //req[0].email
            const admin_name = req[0].admin_name, surname1 = req[0].surname_1, surname2 = req[0].surname_2, email = req[0].email;
            console.log(admin_name, surname1, surname2, email)
            //res.render("admin_panel", { admin_name, surname1, surname2, email })
        });
        //res.send("Aquí está " + user );
    },
    updateAdmin: (req, res) => {
        //const {admin_name_New, surname1_New, surname2_New, email_New} = req.body.admin_name_New;
        let  admin = req.body.admin_name_New
        console.log(admin)
        //console.log(req)
        //console.log(req.body)
        res.send();
    }
}

module.exports = adminController;