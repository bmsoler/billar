var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({	
	username: { type: String },
	email: { type: String },
	password: { type: String },
	image: { type: String, default: 'https://pbs.twimg.com/profile_images/824964972711129088/ZZ8owGYZ.jpg' },
	role: { type: Number, default: 2 } //=> 1 - Administrador, 2 - Solo lectura

}, { timestamps: { createdAt: 'created_at' } });

mongoose.model('User', UserSchema);
