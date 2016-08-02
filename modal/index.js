'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var cgUtils = require('../utils.js');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
var chalk = require('chalk');
var path = require('path');

var ModalGenerator = module.exports = function ModalGenerator(args, options, config) {

    cgUtils.getNameArg(this,args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ModalGenerator, yeoman.generators.Base);

ModalGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    cgUtils.addNamePrompt(this,prompts,'modal');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name;
        }
        cgUtils.askForModuleAndDir('modal',this,true,cb);
    }.bind(this));

};

ModalGenerator.prototype.files = function files() {

    this.ctrlname = _.camelize(_.classify(this.name)) + 'Ctrl';
    this.ctrlAs = this.ctrlname.substring(0,1).toLowerCase() + _.camelize(_.classify(this.name)).substring(1);

    cgUtils.processTemplates(this.name,this.dir,'modal',this,null,null,this.module);

    setTimeout((function(){

        console.log('');
        console.log('  Open this modal by using ' + chalk.bold('angular-ui-bootstrap') + ' module\'s ' + chalk.bold('$uibModal') + ' service:');
        console.log('');
        console.log('  $uibModal.open({');
        console.log('      template: require(\'./' + path.join(this.dir,this.name + '.html') + '\'), //you may need to change this path');
        console.log('      controller: \''+ this.ctrlname +' as ' + this.ctrlAs + '\'');
        console.log('  }).result.then(function(result){');
        console.log('      //do something with the result');
        console.log('  });');
        console.log('');

    }).bind(this),200);

};
