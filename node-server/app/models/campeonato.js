var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CampeonatoSchema = new Schema({	
	name: { type: String },
	image: { type: String },
	estado: { type: Number },
	teams: [],
	results: []
}, { timestamps: { createdAt: 'created_at' } });

mongoose.model('Campeonato', CampeonatoSchema);
