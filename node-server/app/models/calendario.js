var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CalendarioSchema = new Schema({	
	info: { type: String },
	fecha: { type: String },
	avatar: { type: String, default: '/static/img/bolas/1.jpg' },
	avatar2: { type: String, default: '/static/img/bolas/2.jpg' }
}, { timestamps: { createdAt: 'created_at' } });

mongoose.model('Calendario', CalendarioSchema);
