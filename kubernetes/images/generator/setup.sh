#!/bin/bash
git clone ${REPOSITORY} susi_kikbot
cd susi_kikbot
git checkout ${BRANCH}

if [ -v COMMIT_HASH ]; then
    git reset --hard ${COMMIT_HASH}
fi

rm -rf .git
npm install --no-shrinkwrap
