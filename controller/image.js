const Clarifai =require('clarifai');

const app = new Clarifai.App({apiKey: 'f56bebbf0f52476380f10c077b1b11bf'});
const handleImage= (req,res,db) =>{

	const {id}=req.body;
	db('users').where('id','=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json("Unable to update or get entries"));

}

const handleImageurl = (req,res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	 .then(data=>res.json(data))
	 .catch(err=>console.log)
}

module.exports={
	handleImage:handleImage,
	handleImageurl:handleImageurl
}