#!/usr/bin/env bash
#
# PreToolUse (Bash) — agent ne smije preskočiti git hookove.
#
# `--no-verify` na commitu ili pushu preskače provjere koje bi ionako pale u CI-ju.
# To je odluka koju čovjek donosi u svom terminalu, ne agent u njegovo ime.
#
# Gleda samo git commit/push segment komande, do sljedećeg separatora — heredoc
# s porukom commita koja spominje --no-verify nije commit koji ga koristi.
set -uo pipefail

input=$(cat)

if ! command -v jq >/dev/null 2>&1; then
    echo "Blokirano: .claude/hooks/guard-git.sh traži jq, a jq nije instaliran." >&2
    exit 2
fi

command=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
[ -n "$command" ] || exit 0

GIT_SEGMENTS=$(printf '%s' "$command" \
    | tr ';&|\n' '\n\n\n\n' \
    | grep -E '(^|[[:space:]])git([[:space:]]+-[^[:space:]]+([[:space:]]+[^[:space:]]+)?)*[[:space:]]+(commit|push)([[:space:]]|$)' \
    || true)

[ -n "$GIT_SEGMENTS" ] || exit 0

# -n je --no-verify samo za commit; za push je --dry-run i smije proći.
if printf '%s\n' "$GIT_SEGMENTS" | grep -qE '(^|[[:space:]])--no-verify([[:space:]]|$)' \
    || printf '%s\n' "$GIT_SEGMENTS" | grep -E '[[:space:]]commit([[:space:]]|$)' \
        | grep -qE '(^|[[:space:]])-n([[:space:]]|$)'; then
    cat >&2 <<'MSG'
Blokirano: --no-verify iz agent sesije.

Git hookovi pokreću provjere koje bi ionako pale u CI-ju. Ako postoji stvaran
razlog da se preskoče, pokreni komandu iz svog terminala.
MSG
    exit 2
fi

exit 0
