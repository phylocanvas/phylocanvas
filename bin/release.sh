#!/bin/bash
set -e

LEVEL=${1:-"minor"}

npm run build docs
git add dist docs
git commit -m 'Build'

npm version $LEVEL
git push && git push --tags
npm publish
