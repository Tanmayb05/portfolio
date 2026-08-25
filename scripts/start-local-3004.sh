#!/usr/bin/env bash
set -euo pipefail

HOST="127.0.0.1"
PORT="3004"

get_port_pids() {
  lsof -tiTCP:"${PORT}" -sTCP:LISTEN || true
}

PIDS="$(get_port_pids)"

if [ -n "${PIDS}" ]; then
  echo "Port ${PORT} is occupied by PID(s): ${PIDS//$'\n'/ }"
  echo "${PIDS}" | xargs kill

  for _ in {1..20}; do
    if [ -z "$(get_port_pids)" ]; then
      break
    fi
    sleep 0.25
  done

  PIDS="$(get_port_pids)"
  if [ -n "${PIDS}" ]; then
    echo "Force killing PID(s): ${PIDS//$'\n'/ }"
    echo "${PIDS}" | xargs kill -9
  fi
fi

exec npm run dev -- -H "${HOST}" -p "${PORT}"
