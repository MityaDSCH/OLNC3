/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n',
    // Task configuration.
    jshint: {
      files: ['app.js']
    },

    clean: ['./temp/', './dist/'],

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      target: {
        files: {
          'dist/app.min.js': ['app.js']
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'temp',
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

    cssmin: {
      target: {
        files: {
          'dist/stylesheets/screen.css': ['temp/screen.css','bower_components/animate.css/animate.min.css']
        }
      }
    },

    copy: {
      target: {
        files: [
          {expand: true, cwd: './', src: ['stylesheets/**', 'images/**'], dest: 'dist/'},
          {expand: true, cwd: './', src: ['index.html'], dest: './dist/'}
        ]
      }
    },

    connect: {
      serve: {
        options: {
          port: 9000,
          base: './'
        }
      },
      build: {
        options: {
          port: 9000,
          base: './dist/'
        }
      }
    },

    watch: {
      css: {
        files: ['sass/screen.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: true
        }
      } 
    }

  });

  // These plugins provide necessary tasks.
  [
    'grunt-contrib-clean',
    'grunt-contrib-uglify',
    'grunt-contrib-jshint',
    'grunt-contrib-compass',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-cssmin',
    'grunt-contrib-watch'
  ].forEach(function(ele) {
    grunt.loadNpmTasks(ele);
  });

  // tasks.
  grunt.registerTask('default', ['jshint', 'compass:dev', 'connect:serve', 'watch']);
  grunt.registerTask('build', ['jshint', 'clean', 'uglify', 'compass:dist', 'cssmin', 'copy', 'connect:build']);

};