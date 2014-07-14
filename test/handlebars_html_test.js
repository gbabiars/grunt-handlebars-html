'use strict';

var grunt = require('grunt');

var read = grunt.file.read;

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

function readAndEscapeWhitespace(path) {
    return grunt.file.read(path).replace(/\n/g, '').replace(/\s/g, '');
}

exports.handlebars_html = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },

    relative_paths: function(test) {
        test.expect(1);

        var actual = readAndEscapeWhitespace('tmp/relative_paths.html');
        var expected = readAndEscapeWhitespace('test/expected/relative_paths.html');

        test.equal(actual, expected, 'should include the defined script files');

        test.done();
    },

    relative_paths_with_process: function(test) {
        test.expect(1);

        var actual = readAndEscapeWhitespace('tmp/relative_paths_with_process.html');
        var expected = readAndEscapeWhitespace('test/expected/relative_paths_with_process.html');

        test.equal(actual, expected, 'should rewrite the path using the process function');

        test.done();
    },

    custom_data: function(test) {
        test.expect(1);

        var actual = readAndEscapeWhitespace('tmp/custom_data.html');
        var expected = readAndEscapeWhitespace('test/expected/custom_data.html');

        test.equal(actual, expected, 'should use the custom data');

        test.done();
    },

    relative_paths_and_custom_data: function(test) {
        test.expect(1);

        var actual = readAndEscapeWhitespace('tmp/relative_paths_and_custom_data.html');
        var expected = readAndEscapeWhitespace('test/expected/relative_paths_and_custom_data.html');

        test.equal(actual, expected, 'should use both the processed paths and custom data');

        test.done();
    }

//    custom_options: function(test) {
//        test.expect(1);
//
//        var actual = grunt.file.read('tmp/custom_options');
//        var expected = grunt.file.read('test/expected/custom_options');
//        test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');
//
//        test.done();
//    }
};
