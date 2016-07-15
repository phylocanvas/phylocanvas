#!/bin/bash

DIRECTORY=./docs

if [ -d "$DIRECTORY" ]; then
  rm -r $DIRECTORY
fi

jsdoc -t ./node_modules/phylocanvas-jsdoc-template -d $DIRECTORY src/*.js
