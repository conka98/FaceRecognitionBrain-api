const handleSignin = (req,res,db,bcrypt) => {
	const {email,password}=req.body;
	if( !email || !password ){
		return res.status(400).json("Incorrect Form Submission")
	}

	db.select('hash').from('login')
	 .where('email','=' , email)
	 .then(data => {
	 	const isValid=bcrypt.compareSync(password,data[0].hash);

	 	if(isValid){
	 		return db.select('*').from('users')
	 		 .where('email','=', email)
	 		 .then(user => {
	 		 	res.json(user[0]);
	 		 })
	 	     .catch(err => res.status(400).json("unable to Get user"))
	 	} else
	 	{
	 		res.status(400).json("wrong Credentials")	
	 	}

	 })
	 .catch(err => res.status(400).json("wrong Credentials"));
}


module.exports ={
	handleSignin:handleSignin
}