/*
*	Database function for Node.js Chat.
*	Function usage:
*	@register(username, password, function(error, data)).
*/

//Load mongodb driver module.
var mongoose = require('mongoose');

//User Schema
var userSchema = mongoose.Schema(
{
	username: String,
	password: String
});

//User model.
var UserModel = mongoose.model('User', userSchema);

//Create a function for registering.
function register(Username, Password, callback)
{	
	//find if username exists.
	UserModel.findOne({username: Username}, function(error, data)
	{
		//error handler.
		if(error)
			return callback(error);

		//if username exists, throw message.
		if(data)
		{
			return callback(null, 'User already exist');

			mongoose.connection.close();
		}

		//proceed to register if username doesn't exist.
		if(!data)
		{
			var user = new UserModel(
			{
				username: Username,
				password: Password
			});

			//save the user to database.
			user.save(function(error)
			{
				if(error)
					callback(error);

				callback(null, 'Success');
				mongoose.connection.close();
			});
		}
	});
}

function findByName(Username, callback)
{
	UserModel.find({username: Username}, function(error, data)
	{
		if(error)
			return callback(error);

		if(data)
			return callback(null, data);

		mongoose.connection.close();
	});
}

exports.register = register;
exports.findByName = findByName;