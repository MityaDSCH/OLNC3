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

    clean: ['./temp/', './dist/', './app.min.js', './screen.css'],

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      target: {
        files: {
          'app.min.js': ['app.js']
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
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'screen.css': ['temp/screen.css','bower_components/animate.css/animate.min.css']
        }
      }
    },

    htmlmin: {
      target: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'index.html'
        }
      }
    },

    copy: {
      target: {
        files: [
          {expand: true, cwd: './', src: ['stylesheets/fonts/*', 'images/**'], dest: 'dist/'}
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
          base: 'dist'
        }
      }
    },

    watch: {
      css: {
        files: ['sass/screen.scss'],
        tasks: ['compass:dist', 'cssmin', 'copy']
      }
    },

    ftp_push: {
      target: {
        options: {
          authKey: "key1",
          host: "oudinglegalnurse.com",
          dest: "./",
          port: 21
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: [
              "images/*",
              "stylesheets/**/*",
              "app.min.js",
              "index.html"
            ]
          }
        ]
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
    'grunt-contrib-watch',
    'grunt-contrib-htmlmin',
    'grunt-ftp-push'
  ].forEach(function(ele) {
    grunt.loadNpmTasks(ele);
  });

  // tasks.
  grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'compass:dist', 'cssmin', 'htmlmin', 'copy', 'connect:build', 'watch']);
  grunt.registerTask('build', ['jshint', 'clean', 'uglify', 'compass:dist', 'cssmin', 'htmlmin', 'copy']);
  grunt.registerTask('push', ['ftp_push']);

};
