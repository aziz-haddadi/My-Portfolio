---
title: "Securinets 2025 — Lost File"
date: "2025-02-15"
category: "CTF Writeup"
tags: ["Memory Forensics", "Reverse Engineering", "IDA Pro", "Cryptography"]
difficulty: "Hard"
cover: "/content-images/writeups/securinets-2025-lost-file/cover.png"
description: "Ransomware-style challenge requiring memory capture analysis and reverse engineering of an encryption tool to recover a deleted key."
stats: "Memory Forensics • Encryption Recovery"
---

# Lost File — Securinets CTF 2025

## Challenge Scenario
> "My friend told me to run this executable, but it turns out he just wanted to encrypt my precious file. And to make things worse, I don't even remember what password I used. 😥 Good thing I have this memory capture taken at a very convenient moment, right?"

**Artifacts Provided:**
- Disk image with `locker_sim.exe` and `to_encrypt.txt.enc`.
- Memory dump captured during the encryption process.

---

## 🔍 Initial Investigation

### Discovering the Files
Examining the desktop environment, we identify the malicious binary and the encrypted payload.

![Desktop files](/content-images/writeups/securinets-2025-lost-file/desktop-files.png)

### Reverse Engineering the Executable
Using **IDA Pro**, we analyzed `locker_sim.exe` (written in C) to understand the encryption flow.

**The encryption process works as follows:**
1. Takes a command-line argument (`argv[1]`) as the primary password.
2. Reads the system's `COMPUTERNAME` from the registry.
3. Reads a local file called `secret_part.txt` (and deletes it post-encryption).
4. Combines these: `password|HOSTNAME|secret_part_content`.
5. Computes a **SHA256** hash of this combined string.
6. Uses the hash as the **AES-256** key to encrypt the target file.

> [!WARNING]
> **To decrypt, we MUST find:**
> 1. The original command-line password.
> 2. The system hostname.
> 3. The content of the deleted `secret_part.txt`.

---

## 🧠 Memory Forensics with Volatility

### Finding the Password
We use the `consoles` plugin to extract command history:
```bash
vol.py -f mem.vmem --profile=WinXPSP2x86 consoles
# Output: locker_sim.exe hmmisitreallyts
```
**Password:** `hmmisitreallyts`

![Volatility consoles output](/content-images/writeups/securinets-2025-lost-file/volatility-consoles.png)

### Finding the Hostname
Using the `envars` plugin:
**Hostname:** `RAGDOLLF-F9AC5A`

![Environment variables output](/content-images/writeups/securinets-2025-lost-file/envars-output.png)

### Recovering the Deleted Secret
Since `secret_part.txt` was deleted, we checked the Recycle Bin metadata and recovered the content.
**Secret Part:** `sigmadroid`

---

## 🔓 Decryption & Flag Extraction

With all components recovered, we wrote a Python script to reconstruct the key and decrypt the file.

```python
import hashlib
from Crypto.Cipher import AES

def decrypt(enc_path, password, hostname, secret):
    data = f"{password}|{hostname}|{secret}"
    key = hashlib.sha256(data.encode()).digest()
    iv = key[:16] # AES-CBC IV
    # ... decryption logic ...
```

**Final Flag:** `Securinets{screen+registry+mft??}`
*(The flag hints at the forensics techniques used: screen capture/memory, registry analysis, and MFT for file recovery.)*

---

## 🛠️ Tools & Techniques
- **RE:** IDA Pro
- **Memory Forensics:** Volatility Framework (`consoles`, `envars`)
- **Disk Forensics:** Recycle Bin Analysis, MFT artifact examination
- **Crypto:** Python/PyCryptodome (AES-256 CBC)
