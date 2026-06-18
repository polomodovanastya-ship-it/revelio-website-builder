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
# When research is disabled (RESEARCH_ENABLED = false), prune the /research pages
# so they return a real 404 (nginx try_files =404) instead of a soft-404 page.
build:
	rm -rf out
	STATIC_EXPORT=1 node_modules/.bin/next build
	@grep -q 'RESEARCH_ENABLED = false' lib/reports.ts && { rm -rf out/research; echo ">> research disabled — pruned out/research"; } || true

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
