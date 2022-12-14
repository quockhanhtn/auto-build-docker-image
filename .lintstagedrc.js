module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'tsc --noEmit',

  // Prettify TS and JS files
  '**/*.(ts|tsx|js)': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    // `next lint --file ${filenames.join(' ')}`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`,

  // Lint
  '**/src': () => 'npm run lint',
};
