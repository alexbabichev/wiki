// A collection for stdouts
var Replies = new Meteor.Collection('replies');
 
if(Meteor.isClient) {
 
 // Start listening changes in Replies
/*
    Meteor.autosubscribe(function() {
        Meteor.subscribe('replies');
    });
*/
  
 // Set an observer to be triggered when Replies.insert() is invoked
 Replies.find().observe({
  'added': function(item) {
   // Set the terminal reply to Session
   Session.set('stdout', item.message);
  }
 });
 
 // Show the last command in input field
 Template.terminal.last_cmd = function() {
  return Session.get('last_cmd');
 };
  
 // Show the last shell reply in browser
 Template.terminal.window = function() {
  return Session.get('stdout');
 };
 
 // Add an event listener for Run-button
 Template.terminal.events = {
  'click [type="button"]': function() {
   var cmd = $('#command').val();
   Session.set('last_cmd', cmd);
    
   // Call the command method in server side
   Meteor.call('command', cmd);
  }
 };
 
 
}
 
if(Meteor.isServer) {
 var exec;
 var Fiber = Npm.require("fibers");
 
 // Initialize the exec function
 
 Meteor.startup(function() {
  exec = Npm.require('child_process').exec;
 });
 
 // Trigger the observer in Replies collection
/*
    Meteor.publish('replies', function() {
        return Replies.find();
    });
*/
 
 Meteor.methods({
  'command': function(line) {
   // Run the requested command in shell
   exec(line, function(error, stdout, stderr) {
   	// console.log(error, stdout, stderr);
    // Collection commands must be executed within a Fiber
    Fiber(function() {
     Replies.remove({});
     Replies.insert({message: stdout ? stdout : stderr});
    }).run();
   });
  }
 });
 
}