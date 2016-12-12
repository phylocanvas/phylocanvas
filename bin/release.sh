#!/bin/bash
set -e

LEVEL=${1:-"minor"}

npm run build
git add dist
git commit -m 'Build'

npm run docs
git add docs
git commit -m 'Update docs'

npm version $LEVEL
git push && git push --tags
npm publish
