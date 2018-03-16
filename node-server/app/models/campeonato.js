var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CampeonatoSchema = new Schema({	
	name: { type: String },
	teams: [],
	results: []
}, { timestamps: { createdAt: 'created_at' } });

mongoose.model('Campeonato', CampeonatoSchema);
