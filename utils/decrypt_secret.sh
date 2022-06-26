#!/bin/sh
# https://docs.github.com/en/actions/security-guides/encrypted-secrets#storing-large-secrets
# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$JOKES_PASSWORD" \
--output $HOME/build/scraped_jokes.json $HOME/build/scraped_jokes.json.gpg