const MySchema = require('../m_schemas/users') ;
const bcrypt = require('bcrypt');
const success = { success : 'OK' }

exports.Create = (req,res) => { 
	bcrypt.hash(req.body.password,10)
	.then(hash => {
        const insert = new MySchema({ pseudo: req.body.pseudo, password: hash, role: req.body.role })
		insert.save()
		.then(() => res.json(success))
		.catch(error => res.json({ error }));
	})
	.catch(error => res.json({ error}));
}

exports.Login = (req,res) => {
	MySchema.findOne({ pseudo: req.body.pseudo })
	.then(user => { 
		if (!user) { return res.json({ error: 'Utilisateur non trouvé' }); }

		bcrypt.compare(req.body.password,user.password)
		.then(valid => {
			if(!valid) { return res.json({ error: 'Mot de passe incorrect' }); }
			return res.json({ id: user._id, pseudo: user.pseudo, role: user.role });
		})
        .catch(error => res.json({ error }));
	})
	.catch(error => res.json({ error }));
}
