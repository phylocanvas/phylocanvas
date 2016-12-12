#!/bin/bash
set -e

LEVEL=${1:-"minor"}

npm run build
npm run docs
git add dist docs polyfill.js
git commit -m 'Build'

npm version $LEVEL
git push && git push --tags
npm publish
