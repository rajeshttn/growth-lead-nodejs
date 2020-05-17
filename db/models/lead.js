const mongoose = require('mongoose');

const ModelIncrement = require('./modelIncrement');

const LeadSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  first_name: String,
  last_name: String,
  mobile: {
    type: Number,
    required: [true, "Mobile number is required"],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: "Mobile number must be of 10 digits"
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v);
      },
      message: "Invalid email id"
    },
  },
  location_type: {
    type: String,
    enum: ["City", "Country", "Zip"]
  },
  location_string: String,
  status: {
    type: String,
    default: "Created",
    enum: ["Created", "Contacted"]
  },
  communication: String,
});

LeadSchema.pre('save', async function(next) {
  const id = await ModelIncrement.getNextId('Lead');
  this.id = id;
  next();
});

module.exports = mongoose.model('Lead', LeadSchema);
