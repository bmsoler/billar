var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LinkSchema = new Schema({
	id: { type: String },
	from: { type: String },
	to: { type: String },
	role: { type: String, default: '' },
	name: { type: String, default: '' },
	type: { type: String, default: 'Otras' },

	nodo_from: { type: Schema.Types.ObjectId, ref: 'Nodo' },  
	nodo_to: { type: Schema.Types.ObjectId, ref: 'Nodo' },  

}, { timestamps: { createdAt: 'created_at' } });

mongoose.model('Link', LinkSchema);
