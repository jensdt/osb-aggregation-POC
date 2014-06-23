/**
 * Created by roexber on 23/06/14.
 */
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var NmscSchema = new Schema({
    name    : String,
    code    : String
});

mongoose.model( 'Nmsc', NmscSchema );
mongoose.connect( 'mongodb://localhost/express' );