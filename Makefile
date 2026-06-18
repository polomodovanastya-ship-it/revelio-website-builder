# Revelio redesign — build & deploy
#
# Deploys the static export to revelio.tech (Docker nginx serves the host dir
# /home/web/revelio-static, mounted read-only into the revelio-nginx container).
# Backend routes (/api, dify, etc.) live in the nginx config, not the web root,
# so they are unaffected. The export is self-contained (incl. legal/*.pdf).

SSH_HOST   ?= revelio
REMOTE_DIR ?= /home/web/revelio-static

.PHONY: build deploy deploy-no-backup

# Build the self-contained static export into ./out
build:
	rm -rf out
	STATIC_EXPORT=1 node_modules/.bin/next build

# Build, back up the remote web root, then sync ./out over it.
# test-form.html (root-owned, separate nginx location) and .DS_Store are left untouched.
deploy: build
	@echo ">> Backing up remote web root…"
	ssh $(SSH_HOST) 'cp -a $(REMOTE_DIR) $(REMOTE_DIR).bak-$$(date +%Y%m%d-%H%M%S)'
	@echo ">> Syncing out/ -> $(SSH_HOST):$(REMOTE_DIR)/ …"
	rsync -avz --delete --exclude='/test-form.html' --exclude='.DS_Store' out/ $(SSH_HOST):$(REMOTE_DIR)/
	@echo ">> Done: https://revelio.tech/"

# Same as deploy but skips the server-side backup.
deploy-no-backup: build
	rsync -avz --delete --exclude='/test-form.html' --exclude='.DS_Store' out/ $(SSH_HOST):$(REMOTE_DIR)/
	@echo ">> Done: https://revelio.tech/"
