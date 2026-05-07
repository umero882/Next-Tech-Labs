# Infrastructure & Operations

> Source of truth for **how this site runs** and **how to get back in** if something breaks. Kept short on purpose — secrets live outside the repo, this file just tells you where.

---

## 1. Live surface

| URL | Purpose | Notes |
|---|---|---|
| `https://nextechlabs.org` | Public portfolio site | Apex |
| `https://www.nextechlabs.org` | Public portfolio site | Same app, second host |
| `https://coolify.nextechlabs.org` | Coolify dashboard (admin) | TLS, behind Cloud‑edge firewall on 443 |

All three TLS certs are Let's Encrypt, auto‑renewed by Traefik (Coolify‑managed proxy). No manual renewal action needed.

---

## 2. Hosting

**VPS** — Hostinger.

| Field | Value |
|---|---|
| Hostname | `srv1385183.hstgr.cloud` |
| Public IPv4 | `76.13.240.144` |
| Public IPv6 | `2a02:4780:12:87c5::1` |
| Hostinger VPS id | `1385183` |
| Hostinger firewall | `Coolify-Firewall` (id `168720`) — TCP **22/80/443 only** |
| Tailnet IP | `100.124.164.50` |
| Tailnet hostname | `nextechlabs-vps` |

DNS managed at Hostinger (NS = `ns1.dns-parking.com` / `ns2.dns-parking.com`). Active records:

```
nextechlabs.org      A  76.13.240.144   TTL 300
www.nextechlabs.org  A  76.13.240.144   TTL 300
coolify              A  76.13.240.144   TTL 300
```

(Plus existing TXT/MX for SPF/DKIM/Google Workspace — left untouched.)

---

## 3. Coolify

| Field | Value |
|---|---|
| Version | v4.x (auto‑update enabled, daily check) |
| Admin user | `ulove882@gmail.com` (2FA enabled) |
| Project | `Next Tech Labs` (uuid `xitsvu8aj8gqpjl56vdzs795`) |
| Application | `nexttechlabs-portfolio` (uuid `t9jfrtoz8q7h9jfzigp6fchv`) |
| Source | `https://github.com/umero882/Next-Tech-Labs` branch `main` (public repo) |
| Build pack | Dockerfile (multi‑stage `node:20-alpine` → `nginx:1.27-alpine`) |
| Healthcheck | `GET /healthz` |
| Server | localhost (uuid `tryriohi8f392b701scysv6k`) |
| Destination | `coolify` Docker network |

Auto‑deploy on push to `main` is **off** (no GitHub webhook configured). To redeploy after a push:

```bash
TOKEN="$(cat C:/Admin/Coolify/api-token.txt)"   # see §6
curl -H "Authorization: Bearer $TOKEN" \
  -X POST "http://100.124.164.50:8000/api/v1/deploy?uuid=t9jfrtoz8q7h9jfzigp6fchv&force=true"
```

Or click *Deploy* in the dashboard.

---

## 4. Repository → image pipeline

Build artifacts in this repo:

- `Dockerfile` — multi‑stage. Builder runs `npm ci && npm run build`; runtime is nginx serving `dist/`.
- `nginx.conf` — SPA fallback via `try_files $uri /index.html`, gzip, asset caching, security headers, `/healthz`. The `/projects/...` regex location only matches image extensions so SPA routes like `/projects/password-manager` reach the catch‑all.
- `.dockerignore` — keeps `node_modules`, `.git`, `docs/`, etc. out of the build context.

Local equivalent:
```bash
npm run dev    # vite dev server on :5173
npm run build  # writes dist/
```

---

## 5. Network defense

```
                 Internet
                    │
                    ▼
        ┌── Hostinger cloud firewall ──┐
        │   allow:  22, 80, 443        │
        │   deny:   everything else    │
        └──────────────┬───────────────┘
                       ▼
                  76.13.240.144
                  ├─ :22  → sshd  (key‑only, fail2ban)
                  ├─ :80  → Traefik (redirects → 443)
                  └─ :443 → Traefik
                            ├─ Host: nextechlabs.org      → portfolio app (nginx :80)
                            ├─ Host: www.nextechlabs.org  → portfolio app
                            └─ Host: coolify.nextechlabs.org → coolify dashboard

           Tailscale (overlay, no public exposure)
                  100.124.164.50 / nextechlabs-vps
                  ├─ :22   → sshd (also via Tailscale SSH)
                  └─ :8000 → Coolify API/UI (private admin path)
```

**Hostinger firewall** drops public traffic to anything except 22/80/443. Coolify port 8000, Sentinel ports 6001‑6002, monitoring ports — all unreachable from the internet.

**Coolify API IP allowlist** — `100.75.175.15,172.16.1.1,127.0.0.1`. Public‑FQDN API access is **403** by design; UI login still works publicly (gated by 2FA).

---

## 6. Secrets

**Stored on the operator workstation, never in this repo.**

| File | Purpose |
|---|---|
| `C:\Admin\Coolify\Private key.txt` / `Public key.txt` | Original Coolify‑generated SSH keypair (works on `72.60.205.121`, the *other* Coolify host) |
| `C:\Admin\Coolify\ssh key.txt` / `ssh key pub.pub` | Manual ed25519 keypair (passphrase‑protected) authorized on `76.13.240.144` |
| `C:\Admin\Coolify\automation\coolify_automation` / `.pub` | Passphrase‑less ed25519 keypair for scripted SSH to `76.13.240.144` |
| `C:\Admin\Coolify\Admin coolify login.txt` | Coolify dashboard email + password |
| `C:\Admin\Hostinger\Hostinger API.txt` | Hostinger Public API bearer token (DNS, VPS, firewall) |

> If you rotate any of these, also update what they point to (Coolify token rotation requires re‑creating in `Settings → Keys & Tokens`; SSH key rotation requires updating `/root/.ssh/authorized_keys` on the VPS).

---

## 7. SSH

```bash
ssh -i "C:/Admin/Coolify/automation/coolify_automation" root@76.13.240.144
# or via tailnet (preferred)
ssh -i "C:/Admin/Coolify/automation/coolify_automation" root@100.124.164.50
```

**Posture (`/etc/ssh/sshd_config.d/99-hardening.conf` + `50-cloud-init.conf`):**

- `PasswordAuthentication no`
- `PermitRootLogin prohibit-password` (key‑only)
- `KbdInteractiveAuthentication no`, `ChallengeResponseAuthentication no`
- `MaxAuthTries 3`, `MaxSessions 4`, `LoginGraceTime 30`
- `ClientAliveInterval 300`, `ClientAliveCountMax 2`
- `X11Forwarding no`, `AllowAgentForwarding no`

**fail2ban** — `sshd` jail, `maxretry=4`, `findtime=10m`, `bantime=1h`. Tailnet (`100.64.0.0/10`) plus `127.0.0.1/8` are in `ignoreip`.

**Tailscale SSH** is enabled (`tailscale up --ssh`), so SSH over the tailnet uses Tailscale auth in addition to keys.

---

## 8. Backups

Cron `/etc/cron.d/coolify-backup` runs `/usr/local/sbin/coolify-backup.sh` daily at **03:30 UTC**.

Output:
```
/data/coolify/backups/coolify-db-<TS>.sql.gz       # pg_dump of Coolify's own DB
/data/coolify/backups/coolify-data-<TS>.tgz        # /data/coolify/{ssh,proxy,source}
```
**Retention:** 7 days. **Log:** `/var/log/coolify-backup.log`.

> No off‑site copy yet. If the VPS dies, these files die with it. Future hardening: rsync to a second VPS or upload to S3‑compatible object storage.

To run the backup on demand:
```bash
ssh root@76.13.240.144 /usr/local/sbin/coolify-backup.sh
```

---

## 9. Notifications

Two channels configured under Team `0` (root team) — both flag failure events, stay quiet on success:

- **Email** — Gmail SMTP via `smtp.gmail.com:465` (SSL), sender + recipient `ulove882@gmail.com`. Auth uses a Google App Password.
- **Telegram** — bot id `7752384964`, chat `1205702596`.

**Events that page you:**
deployment_failure · status_change · backup_failure · scheduled_task_failure · docker_cleanup_failure · server_disk_usage · server_unreachable · server_patch · traefik_outdated.

**Events that stay silent:**
deployment_success · backup_success · scheduled_task_success · docker_cleanup_success · server_reachable.

Adjust toggles in *Coolify → Notifications* (tail of `Email` and `Telegram` tabs).

---

## 10. Recovery — locked out scenarios

| Symptom | Fix |
|---|---|
| Lost Coolify dashboard 2FA | Disable 2FA via tinker: `ssh root@100.124.164.50 'docker exec coolify php artisan tinker --execute="App\\Models\\User::where(\"email\",\"ulove882@gmail.com\")->first()->update([\"two_factor_secret\"=>null,\"two_factor_recovery_codes\"=>null,\"two_factor_confirmed_at\"=>null]);"'` |
| Locked out of API by IP allowlist | Same path: `App\Models\InstanceSettings::first()->update(["allowed_ips"=>"0.0.0.0/0"])` then re‑lock after fixing |
| Locked out of SSH | Hostinger Browser Terminal (hPanel → VPS → Browser terminal). It bypasses sshd — runs as root directly. |
| Hostinger firewall locks you out unintentionally | Hostinger API: `curl -X POST -H "Authorization: Bearer $HT" https://developers.hostinger.com/api/vps/v1/firewall/<other-fw-id>/activate/1385183` (or detach via `DELETE /api/vps/v1/public-keys/attach-to-virtual-machine` style endpoints — see Hostinger docs) |
| Tailscale device dies / token revoked | New `tailscale up --hostname=nextechlabs-vps --ssh` from the host, then re‑authorize in the Tailscale admin console |
| Coolify DB corrupt | Stop coolify, restore from `/data/coolify/backups/coolify-db-<TS>.sql.gz` into `coolify-db` container |

---

## 11. Routine ops cheatsheet

```bash
# Status of the portfolio app (via tailnet, fastest)
TOKEN="$(cat C:/Admin/Coolify/api-token.txt)"
curl -H "Authorization: Bearer $TOKEN" \
  "http://100.124.164.50:8000/api/v1/applications/t9jfrtoz8q7h9jfzigp6fchv" | jq '{status,fqdn,last_online_at}'

# Force redeploy
curl -H "Authorization: Bearer $TOKEN" -X POST \
  "http://100.124.164.50:8000/api/v1/deploy?uuid=t9jfrtoz8q7h9jfzigp6fchv&force=true"

# Tail Coolify worker logs
ssh root@100.124.164.50 'docker logs --tail=50 -f coolify'

# Tail Traefik logs
ssh root@100.124.164.50 'docker logs --tail=50 -f coolify-proxy'

# Disk usage on the VPS
ssh root@100.124.164.50 'df -h / && du -sh /data/coolify/* 2>/dev/null | sort -h'

# fail2ban current bans
ssh root@100.124.164.50 'fail2ban-client status sshd'

# Manual backup now
ssh root@100.124.164.50 '/usr/local/sbin/coolify-backup.sh'
```
