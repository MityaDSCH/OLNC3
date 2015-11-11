/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      files: ['app.js']
    },

    clean: ['./temp', './dist'],

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets',
          environment: 'development'
        }
      }
    },

    copy: {
      target: {
        files: [
          {expand: true, src: ['stylesheets/**', 'images/**'], dest: 'dist/'},
          {expand: true, src: ['index.html'], dest: 'dist/'},
          {expand: true, src: ['app.min.js', 'scrollTo.js'], dest: 'dist/'},
          {expand: true, src: ['animate.css'], dest: 'dist/'}
        ]
      }
    },

    connect: {
      serve: {
        options: {
          port: 9000,
          base: './',
          keepalive: true
        }
      },
      build: {
        options: {
          port: 9000,
          base: './dist',
          keepalive: true
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  [
    'grunt-contrib-clean',
    'grunt-contrib-uglify',
    'grunt-contrib-concat',
    'grunt-contrib-jshint',
    'grunt-contrib-compass',
    'grunt-contrib-connect',
    'grunt-contrib-copy'
  ].forEach(function(ele) {
    grunt.loadNpmTasks(ele);
  });

  // tasks.
  grunt.registerTask('default', ['jshint', 'compass:dev', 'connect:serve']);
  grunt.registerTask('build', ['jshint', 'clean', 'compass:dist', 'copy', 'connect:build']);

};
