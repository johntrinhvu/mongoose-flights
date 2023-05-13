const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create,
  addToCast
};

async function addToCast(req, res) {
  const flight = await Flight.findById(req.params.id);
  // The cast array holds the ticket's ObjectId (referencing)
  flight.cast.push(req.body.ticketId);
  await flight.save();
  res.redirect(`/flights/${flight._id}`);
}

async function newTicket(req, res) {
  //Sort performers by their name
  const tickets = await Ticket.find({}).sort('name');
  res.render('tickets/new', { title: 'Add Ticket', tickets });
}

async function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // Fix by either reformatting to "MM-DD-YYYY" or by 
  // appending a "time" fragment like this... 
  req.body.born += 'T00:00';
  try {
    await Performer.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/performers/new');
}