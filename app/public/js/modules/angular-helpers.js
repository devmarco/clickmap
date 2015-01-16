angular.module('StringHelpers', [])
  .factory('helper', function() {
    return {
      toFilename: function(filename) {
        return filename
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'');
      },

      fromFilename: function(filename) {
        return filename
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-');
      }
    }
  });

