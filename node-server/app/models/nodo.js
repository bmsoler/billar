var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise;

var NodoSchema = new Schema({	
	ref: { type: String },
	name: { type: String },
	type: { type: String },
	has_image: { type: String, default: 'Y' },
	image: { type: String },
	imdb_id: { type: String },
	//Campos para una película
	released: { type: String },
	runtime: { type: Number },
	director: { type: String },
	plot: { type: String },
	language: { type: String },
	country: { type: String },
	awards: { type: String },
	imdb_rating: { type: Number, default: 5 },
	imdb_votes: { type: String, default: 0 },
	trailers: { type: String },
	//Campos para un actor
	biography: { type: String },
	cargo: { type: String },
	formacion: { type: String },
	experiencia: { type: String },
	relaciones: { type: Array },
	phone: { type: String },
	phone2: { type: String },
	email: { type: String },
	twitter: { type: String },
	linkedin: { type: String },
	youtube: { type: String },
	instagram: { type: String },
	facebook: { type: String },
	web: { type: String },
	birthday: { type: String },
	deathday: { type: String }, 
	gender: { type: String, default: 'unknown' },
	place_of_birth: { type: String },
	categories:{
		Institucional: { type: Number, default: 0 },
		Empresarial: { type: Number, default: 0 },
		Comercial: { type: Number, default: 0 },
		Social: { type: Number, default: 0 },
		Otras: { type: Number, default: 0 }
	},
	loaded: { type: Boolean, default: false },
	raiz: { type: Boolean, default: false },
	remarcar: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created_at' } });

NodoSchema.plugin(AutoIncrement, {inc_field: 'id'});

mongoose.model('Nodo', NodoSchema);
