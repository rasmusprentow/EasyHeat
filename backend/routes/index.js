
/*
 * GET home page.
 */

var index = function(req, res){
  res.render('index', { title: 'Express' });
};


module.exports = exports = function(app) {

	app.configure(function () {
		app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			if ('OPTIONS' == req.method) {
				res.send(200);
			}
			else {
				next();
			}
		});
	});


	// Homepage
	app.get('/', index);

	// begin resources

	// -- temperature --
	var temperature = require('../resources/temperature.js');

	app.post('/temperatures', temperature.create);		// Create
	app.get('/temperatures/:id', temperature.get);		// Read
	app.put('/temperatures/:id', temperature.update);		// Update
	app.del('/temperatures/:id', temperature.delete);		// Delete
	app.get('/temperatures', temperature.list);			// List



	// end resources
}