'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var config = require('./GruntConfig.json');

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var demoAppConfig = {
    app    : 'app',
    server : 'server',
    dist   : 'dist'
  };

  try {
    demoAppConfig.app = require('./bower.json').appPath || demoAppConfig.app;
  } catch (e) {}

  grunt.initConfig({
    demoApp: demoAppConfig,
    watch: {
      coffee: {
        files: ['<%= demoApp.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= demoApp.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= demoApp.app %>/{,*/}*.html',
          '{.tmp,<%= demoApp.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= demoApp.app %>}/scripts/{,*/}*.js',
          '<%= demoApp.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, demoAppConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    'string-replace': {
      dist: {
        files: [{
           expand: true,
           flatten: true,
           src: ['server/Api/config.php'],
           dest: 'server/Api/'
        }],
        options: {
          replacements: [{
            pattern: 'define("API_KEY", "'+config.virusTotal.dev.apikey+'");',
            replacement: 'define("API_KEY", "'+config.virusTotal.prod.apikey+'");'
          }]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= demoApp.dist %>/*',
            '!<%= demoApp.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= demoApp.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= demoApp.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    shell: {
      composerInstall: {
        command: 'composer install -v -o --working-dir server',
        options: {
           stdout: true
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= demoApp.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= demoApp.app %>/images',
        javascriptsDir: '<%= demoApp.app %>/scripts',
        fontsDir: '<%= demoApp.app %>/styles/fonts',
        importPath: '<%= demoApp.app %>/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    concat: {
      dist: {
        files: {
          '<%= demoApp.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= demoApp.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= demoApp.app %>/index.html',
      options: {
        dest: '<%= demoApp.dist %>'
      }
    },
    usemin: {
      html: ['<%= demoApp.dist %>/{,*/}*.html'],
      css: ['<%= demoApp.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= demoApp.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= demoApp.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= demoApp.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= demoApp.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= demoApp.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= demoApp.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= demoApp.dist %>'
        }]
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= demoApp.dist %>/scripts',
          src: '*.js',
          dest: '<%= demoApp.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= demoApp.dist %>/scripts/scripts.js': [
            '<%= demoApp.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= demoApp.dist %>/scripts/{,*/}*.js',
            '<%= demoApp.dist %>/styles/{,*/}*.css',
            '<%= demoApp.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= demoApp.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= demoApp.app %>',
          dest: '<%= demoApp.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        },{
          expand: true,
          cwd: '<%= demoApp.server %>',
          src: ['Api/*.php'],
          dest: '<%= demoApp.dist %>/server'
          }
        ]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'coffee:dist',
    'compass:server',
    'livereload-start',
    'shell:composerInstall',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'compass',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    //'test',
    'coffee',
    'compass:dist',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'shell:composerInstall',
    'string-replace:dist',
    'copy',
    'ngmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);
};
