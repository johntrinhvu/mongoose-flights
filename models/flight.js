const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const airlines = ['American', 'Southwest', 'United'];
const airports = ['AUS', 'DFW', 'DEN', 'LAX'];

const destinationSchema = new Schema({
  airport: {
    type: String, 
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'IAD']

  },

  arrival: {
    type: Date

  }

});

const flightSchema = new Schema({
  airline: {
    type: String, 
    enum: ['American', 'Southwest', 'United']
  },

  airport: {
    type: String, 
    enum: ['AUS', 'DFW', 'DEN', 'LAX'], 
    Default: "IAD"
  },

  flightNo: {
    type: Number, 
    require: true, 
    min: 10, 
    max: 9999
  },

  departs: {
    type: Date, 
    Default: () => {
      return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    }
  },

  destinations: [destinationSchema],
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);

// Compile the schema into a model and export it
module.exports = {Flight, airlines, airports};