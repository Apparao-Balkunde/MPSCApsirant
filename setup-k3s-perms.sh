#!/bin/bash
# ==============================================================================
# Script: setup-k3s-perms.sh
# Changes ownership of /etc/rancher/k3s/k3s.yaml to the current user ($USER),
# sets permissions to 600, appends KUBECONFIG to ~/.bashrc, and tests kubectl.
# ==============================================================================

set -e

# Detect if sudo is required
if [ "$(id -u)" -ne 0 ] && command -v sudo >/dev/null 2>&1; then
    SUDO_CMD="sudo"
else
    SUDO_CMD=""
fi

K3S_CONFIG="/etc/rancher/k3s/k3s.yaml"
CURRENT_USER="${USER:-$(whoami)}"

echo "=== Configuring K3s permissions for user: $CURRENT_USER ==="

# Ensure directory exists and has traversal permissions
$SUDO_CMD mkdir -p /etc/rancher/k3s 2>/dev/null || true
$SUDO_CMD chmod 755 /etc/rancher /etc/rancher/k3s 2>/dev/null || true

# Change ownership of /etc/rancher/k3s/k3s.yaml to the current user ($USER)
if [ -f "$K3S_CONFIG" ]; then
    $SUDO_CMD chown "$CURRENT_USER:$CURRENT_USER" "$K3S_CONFIG"
    # Set permissions to 600
    $SUDO_CMD chmod 600 "$K3S_CONFIG"
    echo "✓ Changed ownership of $K3S_CONFIG to $CURRENT_USER:$CURRENT_USER and set permissions to 600"
else
    echo "Notice: $K3S_CONFIG not present on this machine."
fi

# Append 'export KUBECONFIG=/etc/rancher/k3s/k3s.yaml' to ~/.bashrc
EXPORT_COMMAND="export KUBECONFIG=/etc/rancher/k3s/k3s.yaml"

if grep -Fxq "$EXPORT_COMMAND" ~/.bashrc 2>/dev/null; then
    echo "✓ KUBECONFIG export already present in ~/.bashrc"
else
    echo "" >> ~/.bashrc
    echo "$EXPORT_COMMAND" >> ~/.bashrc
    echo "✓ Appended '$EXPORT_COMMAND' to ~/.bashrc"
fi

# Set in current environment
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

# Source ~/.bashrc
if [ -f ~/.bashrc ]; then
    # shellcheck source=/dev/null
    . ~/.bashrc 2>/dev/null || true
fi

echo "=== Testing kubectl configuration ==="
if command -v kubectl >/dev/null 2>&1; then
    kubectl get nodes
else
    echo "kubectl command not installed or not in PATH in this environment."
fi
