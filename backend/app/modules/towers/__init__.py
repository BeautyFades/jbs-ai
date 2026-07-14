# Intentionally empty: auth.deps imports towers.registry, and pulling the
# router in here would close a circular import (router -> auth -> registry).
# Import the router explicitly via app.modules.towers.router.
