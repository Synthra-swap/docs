module.exports = {
  // Theme configuration
  book: {
    assets: './assets',
    css: [
      'styles/website.css'
    ],
    js: [
      'scripts/theme.js'
    ]
  },
  
  // Template variables
  variables: {
    theme: {
      name: 'Synthra Theme',
      version: '1.0.0'
    }
  },

  // Hooks
  hooks: {
    'page:before': function(page) {
      // Add custom meta tags and properties
      return page;
    }
  },

  // Filters for templates
  filters: {
    // Custom template filters can be added here
  },

  // Blocks for custom content
  blocks: {
    // Custom blocks can be added here
  }
};
