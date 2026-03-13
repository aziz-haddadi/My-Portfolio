---
title: "Securinets 2025 — Recovery"
date: "2025-02-15"
category: "CTF Writeup"
tags: ["Network Analysis", "DNS Exfiltration", "Reverse Engineering", "Ransomware"]
difficulty: "Hard"
cover: "/content-images/writeups/securinets-2025-recovery/cover.png"
description: "Analysis of a DNS-based covert channel used for data exfiltration and ransomware delivery. Includes malware reconstruction and custom LCG decryption."
stats: "Network Forensics • Malware Reassembly"
---

# Recovery — Securinets CTF 2025

## Scenario
A victim machine has been compromised with ransomware. The attack used DNS as a covert channel to deliver the malicious payload. Your task is to analyze network traffic and filesystem artifacts to reconstruct the attack.

**Artifacts Provided:**
- Network packet capture (PCAP)
- Home directory dump
- Encrypted flag file (`sillyflag.png`)

---

## 🔍 Network Traffic Analysis

### Wireshark Examination
Filtering for DNS traffic revealed queries to a suspicious domain: `meow`.
The labels appeared to contain **Base32-encoded** data with index numbers, suggesting chunked data transmission.

![Wireshark Protocol Hierarchy](/content-images/writeups/securinets-2025-recovery/wireshark-overview.png)
![DNS queries to meow domain](/content-images/writeups/securinets-2025-recovery/dns-meow.png)

> [!NOTE]
> This is a classic **DNS Data Exfiltration/Infiltration** technique where file data is tunneled through DNS query subdomains.

---

## 🛠️ Malware Reconstruction

### Desktop Discovery
Examining the home directory revealed the following:
![Victim desktop files](/content-images/writeups/securinets-2025-recovery/desktop-files.png)

### Recovering Source from GitHub
Examining the commit history for the suspicious repo:
![GitHub commit history](/content-images/writeups/securinets-2025-recovery/github-commits.png)

### Extracting Payload from PCAP
We wrote a Python script using **Scapy** to:
1. Parse the DNS labels from the "meow" domain.
2. Reassemble the Base32 chunks based on their index.
3. XOR-decrypt the reassembled bytes using a single-byte key found in the packet headers.

**Result:** Reconstructed an executable named `reconstructed.exe`.

### Unpacking
The binary was packed with **UPX**. After unpacking, we performed static analysis with **IDA Pro**.

---

## 🔬 Reverse Engineering

### Encryption Algorithm
The malware uses a custom **Linear Congruential Generator (LCG)** for keystream generation.

**Key Components:**
- **Seed:** Generated from the full absolute path of the target file + a NULL terminator.
- **Secret:** A 37-byte hardcoded string: `evilsecretcodeforevilsecretencryption`.
- **LCG Params:** `multiplier=1664525`, `increment=1013904223`.

---

## 🔓 Flag Extraction

We implemented the decryption algorithm in Python, supplying the correct full path (`C:\Users\gumba\Desktop\sillyflag.png`) to generate the correct seed.

![Decrypted flag image](/content-images/writeups/securinets-2025-recovery/decrypted-flag.png)

**Flag:** `Securinets{DNS_3xf1l_w1th_cust0m_LCG_encrypt10n}`

---

## 📊 Investigation Summary
- **88** DNS Chunks Extracted
- **21KB** Malware Reconstructed
- **UPX** Unpacking performed
- **Custom LCG** Algorithm reversed
- **Base32** and XOR decoding
