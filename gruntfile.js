// 1. wrapper
// 2. Project and task configuration
// 3. load Grunt plugins and tasks
// 4. custom tasks
// wrapper function
module.exports = function(grunt){

  // poject configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    jshint: {
      files: ['gruntfile.js', 'src/validation.js'],
      options: {
        esversion: 6,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        src: 'src/babel.<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['env'],
      },
      dist: {
        files: {
          'src/babel.<%= pkg.name %>.js': 'src/<%= pkg.name %>.js'
        }
      }
    },
    jsdoc: {
      dist: {
        src: [ 'src/validation.js' ],
        options: {
          destination: 'doc'
        }
      }
    } 
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsdoc');



  // Default task(s).
  grunt.registerTask( 'build', ['babel'] );
  grunt.registerTask( 'default', ['build', 'jsdoc', 'jshint', 'uglify']);



};