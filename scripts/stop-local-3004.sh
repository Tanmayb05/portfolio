#!/usr/bin/env bash
set -euo pipefail

PORT="3004"

get_port_pids() {
  lsof -tiTCP:"${PORT}" -sTCP:LISTEN || true
}

PIDS="$(get_port_pids)"

if [ -z "${PIDS}" ]; then
  echo "No server is listening on port ${PORT}."
  exit 0
fi

echo "Stopping process(es) on port ${PORT}: ${PIDS//$'\n'/ }"
echo "${PIDS}" | xargs kill

for _ in {1..20}; do
  if [ -z "$(get_port_pids)" ]; then
    echo "Port ${PORT} is clear."
    exit 0
  fi
  sleep 0.25
done

PIDS="$(get_port_pids)"
if [ -n "${PIDS}" ]; then
  echo "Force killing process(es) on port ${PORT}: ${PIDS//$'\n'/ }"
  echo "${PIDS}" | xargs kill -9
fi

echo "Port ${PORT} is clear."
