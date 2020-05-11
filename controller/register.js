const handleRegister = (req,res,db,bcrypt)=>{
	
	const {email,name,password}=req.body;
	if( !email || !password  || !name){
		return res.status(400).json("Incorrect Form Submission")
	}
	const hash=bcrypt.hashSync(password);

	db.transaction(trx =>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			console.log(loginEmail)
			return trx('users')
			.returning('*')
			.insert({
				name:name,
				email:loginEmail[0],
				joined:new Date()
			})
			.then(user=>{
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => {
		console.log(err);
		res.status(400).json("unable to process request");
	})

}

module.exports={
	handleRegister:handleRegister
}