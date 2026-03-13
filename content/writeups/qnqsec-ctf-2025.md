---
title: "QnQSec CTF 2025 — Overview"
date: "2025-01-10"
category: "CTF Writeup"
tags: ["CTF", "Forensics", "QnQSec"]
difficulty: "Medium"

description: "Overview of forensics challenges from QnQSec CTF 2025, covering memory forensics with Volatility 3, phishing incident response, and Living Off The Land (LOTL) techniques."
stats: "2 Challenges Solved • 100% Success Rate"
---

# QnQSec CTF 2025

This writeup documents my approach to solving two complex forensics challenges from QnQSec CTF 2025.

The challenges required a combination of:
* Windows memory forensics with **Volatility 3**
* Email forensics and phishing incident response
* Windows registry analysis and artifact examination
* Malware analysis and behavioral investigation
* **AmCache** forensics for execution tracking
* Scheduled task persistence identification
* Command & Control (C2) infrastructure analysis

## Event Stats

| Challenges Solved | Questions Answered | Tools Used | Success Rate |
|-------------------|--------------------|------------|--------------|
| 2                 | 8                  | 10+        | 100%         |

---

## 🚩 Challenges Solved

### 01. Masks
A comprehensive memory forensics challenge investigating a phishing incident. Analyze a memory dump to answer 8 questions tracing the complete attack chain from email delivery to persistence establishment.
- **Techniques:** Volatility 3, AmCache Analysis, VirusTotal, Persistence Hunting
- [Read Full Writeup →](/writeups/qnqsec-2025-masks)

### 02. Execution
A registry forensics challenge involving malicious command identification and malware analysis. Investigate a Living Off The Land (LOTL) attack using Windows `bitsadmin`.
- **Techniques:** Registry Forensics, Malware Analysis, LOTL, IOC Extraction
- *(Writeup coming soon)*

---

## 🛠️ Tools & Technologies

### Memory Forensics
- Volatility 3 (pslist, filescan, dumpfiles, amcache)
- pffexport (OST/PST Analysis)

### Threat Intelligence
- VirusTotal (Behavioral Analysis, Hash Lookups)
- OSINT Research

### Analysis Utilities
- Strings, file, sha256sum
- Registry Analysis

---

## 🧠 MITRE ATT&CK Mapping

| Initial Access | Execution | Persistence | Defense Evasion | C2 |
|----------------|-----------|-------------|-----------------|----|
| T1566 Phishing | T1204 User Execution | T1053 Scheduled Task | T1197 BITS Jobs | T1071 App Layer |
| Malicious Attachment | T1059 Command Interp | Registry Run Keys | T1036 Masquerading | HTTP/HTTPS C2 |

---

## 🧠 Key Takeaways

1. **AmCache is Critical:** When direct file extraction fails, Windows AmCache provides hashes that can be cross-referenced with threat intelligence platforms.
2. **LOTL Techniques:** Attackers increasingly abuse legitimate Windows utilities like `bitsadmin` to evade detection.
3. **Persistence Evolution:** Modern attackers favor scheduled tasks over traditional registry Run keys.
4. **File Masquerading:** Never trust file extensions — attackers disguise executables as images to bypass security filters.
