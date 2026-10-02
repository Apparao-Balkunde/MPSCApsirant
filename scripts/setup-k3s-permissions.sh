#!/usr/bin/env bash
# ==============================================================================
# Script: setup-k3s-permissions.sh
# Purpose: Configure K3s permissions for the current user, set KUBECONFIG
#          permanently in ~/.bashrc, and verify that kubectl commands work.
# ==============================================================================

set -euo pipefail

# Text color formatting
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}        K3s User Permissions & KUBECONFIG Setup       ${NC}"
echo -e "${BLUE}======================================================${NC}"

TARGET_USER="${SUDO_USER:-$USER}"
USER_HOME=$(eval echo "~$TARGET_USER")
K3S_CONFIG="/etc/rancher/k3s/k3s.yaml"
USER_KUBE_DIR="$USER_HOME/.kube"
USER_KUBE_CONFIG="$USER_KUBE_DIR/config"
BASHRC_FILE="$USER_HOME/.bashrc"

# 1. Verify K3s configuration file exists
echo -e "\n${YELLOW}[1/4] Checking K3s configuration source...${NC}"
if [ ! -f "$K3S_CONFIG" ]; then
    echo -e "${RED}Error: K3s configuration not found at $K3S_CONFIG${NC}"
    echo "Please ensure K3s is installed and running: curl -sfL https://get.k3s.io | sh -"
    exit 1
fi
echo -e "${GREEN}✓ Found source config at $K3S_CONFIG${NC}"

# 2. Setup user's ~/.kube directory and copy configuration
echo -e "\n${YELLOW}[2/4] Setting up user kubeconfig at $USER_KUBE_CONFIG...${NC}"
sudo mkdir -p "$USER_KUBE_DIR"
sudo cp "$K3S_CONFIG" "$USER_KUBE_CONFIG"
sudo chown -R "$TARGET_USER:$TARGET_USER" "$USER_KUBE_DIR"
sudo chmod 600 "$USER_KUBE_CONFIG"
sudo chmod 700 "$USER_KUBE_DIR"
echo -e "${GREEN}✓ Copied config and applied strict user permissions (chmod 600)${NC}"

# 3. Add KUBECONFIG to ~/.bashrc permanently if not already present
echo -e "\n${YELLOW}[3/4] Configuring KUBECONFIG in $BASHRC_FILE...${NC}"
EXPORT_LINE="export KUBECONFIG=\$HOME/.kube/config"

if grep -Fxq "$EXPORT_LINE" "$BASHRC_FILE" 2>/dev/null; then
    echo -e "${GREEN}✓ KUBECONFIG is already present in $BASHRC_FILE${NC}"
else
    echo "" >> "$BASHRC_FILE"
    echo "# K3s Kubernetes configuration" >> "$BASHRC_FILE"
    echo "$EXPORT_LINE" >> "$BASHRC_FILE"
    echo -e "${GREEN}✓ Appended KUBECONFIG export to $BASHRC_FILE${NC}"
fi

export KUBECONFIG="$USER_KUBE_CONFIG"

# 4. Verify kubectl functionality
echo -e "\n${YELLOW}[4/4] Verifying kubectl connectivity...${NC}"
if ! command -v kubectl >/dev/null 2>&1; then
    echo -e "${RED}Error: kubectl command not found in PATH.${NC}"
    exit 1
fi

echo -e "Testing: ${BLUE}kubectl get nodes${NC}..."
if kubectl get nodes --request-timeout='10s'; then
    echo -e "\n${GREEN}======================================================${NC}"
    echo -e "${GREEN}✓ SUCCESS! K3s kubectl is now working seamlessly!${NC}"
    echo -e "${GREEN}  You can now run any kubectl command without sudo!   ${NC}"
    echo -e "${GREEN}======================================================${NC}"
    echo -e "To reload environment in current terminal session, run:"
    echo -e "  ${YELLOW}source ~/.bashrc${NC}\n"
else
    echo -e "\n${RED}Verification failed. Checking K3s systemd status...${NC}"
    sudo systemctl status k3s --no-pager || true
    exit 1
fi
