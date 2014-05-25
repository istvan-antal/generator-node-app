'use strict';
//var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
//var yosay = require('yosay');
//var chalk = require('chalk');

var NodeAppGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        var prompts = [{
            name: 'appName',
            message: 'What\'s the name of your node application?'
        }];

        this.prompt(prompts, function (props) {
            if (props.pkgName) {
                return this.askForGeneratorName();
            }

            this.appName = props.appName;

            done();
        }.bind(this));
    },

    enforceFolderName: function () {
        if (this.appName !== this._.last(this.destinationRoot().split(path.sep))) {
            this.destinationRoot(this.appName);
        }
    },

    app: function () {
        this.mkdir('lib');
        this.mkdir('spec');
        this.copy('spec/testHelper.js', 'spec/testHelper.js');
        this.copy('Gruntfile.js', 'Gruntfile.js');
        this.copy('package.json', 'package.json');
        this.copy('README.md', 'README.md');
    },

    projectfiles: function () {
        this.copy('gitignore', '.gitignore');
    }
});

module.exports = NodeAppGenerator;
