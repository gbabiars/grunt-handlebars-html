/*
 * grunt-handlebars-html
 * 
 *
 * Copyright (c) 2014 Greg Babiars
 * Licensed under the MIT license.
 */

'use strict';

var Handlebars = require('handlebars');

function processRelativePaths(paths, expand, process) {
    var result = {},
        name;

    for(name in paths) {
        result[name] = process ? expand(paths[name]).map(process) : expand(paths[name]);
    }

    return result;
}

module.exports = function(grunt) {

    grunt.registerMultiTask('handlebars_html', 'Compile Handlebars templates to html', function() {
        var options = this.options(),
            paths = options.paths,
            _ = grunt.util._,
            data;

        var processedPaths = processRelativePaths(paths, grunt.file.expand, options.process);

        data = _.extend({}, options.data, processedPaths);

        this.files.forEach(function(f) {
            var template = grunt.file.read(f.src[0]);
            var compiledTemplate = Handlebars.compile(template);
            var file = compiledTemplate(data);
            grunt.file.write(f.dest, file);
        });

    });

};