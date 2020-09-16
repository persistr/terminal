const Terminal = require('dom-terminal')
const cli = require('@persistr/cli')

var terminal = new Terminal('terminal', { prompt: '', separator: '$', theme: 'modern' }, {
  execute: function(cmd, args) {
    switch (cmd) {
      case 'clear':
        terminal.clear();
        return '';

      case 'persistr':
        return cli.run(args);

      default:
        // Unknown command.
        return false;
    };
  }
});

// Configure the CLI and run the command given on the command line.
cli.output(text => terminal.output(text))

// Export the configured CLI module. In browsers, install a global 'cli' object.
module.exports = terminal
const isBrowser = typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]'
if (isBrowser) global.terminal = terminal
