---
title: "Securinets CTF Quals 2025 — Overview"
date: "2025-02-15"
category: "CTF Writeup"
tags: ["CTF", "Forensics", "Team Mojo Jojo", "Securinets"]
difficulty: "Medium"
cover: "/content-images/writeups/securinets-ctf-2025/banner.png"
description: "Detailed overview of the Securinets CTF Qualifications 2025. Competed with Team Mojo Jojo and achieved 38th place (5th in North Africa). This documents the overall event and links to detailed challenge writeups."
stats: "3 Challenges Solved • 38th Place"
---

# Securinets CTF Quals 2025

This writeup documents my approach to solving three complex forensics challenges from Securinets CTF Quals 2025, where I competed with **Team Mojo Jojo** and achieved **38th place and 5th in North Africa**.

The challenges required a combination of:
* Windows disk forensics and registry analysis
* Memory dump analysis with Volatility
* Data recovery and file system forensics
* Malware investigation and behavioral analysis
* Reverse engineering and cryptographic analysis

## Event Stats

| Challenges Solved | Questions Answered | Tools Used | Place Finish |
|-------------------|--------------------|------------|--------------|
| 3                 | 20+                | 15+        | 38th (Top 4%)|

---

## 🚩 Challenges Solved

### 01. Silent Visitor
A user reported suspicious activity on their Windows workstation. Investigation of a disk image revealed a sophisticated malware delivery chain through a malicious npm package.
- **Techniques:** Registry Forensics, Email Analysis, Malware Analysis, VirusTotal, any.run
- [Read Full Writeup →](/writeups/securinets-2025-silent-visitor)

### 02. Lost File
A ransomware-style challenge involving file encryption. Analyze a memory dump and disk image to recover encryption key components and decrypt the target file.
- **Techniques:** Memory Forensics, Reverse Engineering, IDA Pro, Volatility, Cryptography
- [Read Full Writeup →](/writeups/securinets-2025-lost-file)

### 03. Recovery
A critical file has been deleted from a storage device. Perform data recovery, analyze file system metadata, and decrypt hidden data using inode timestamps.
- **Techniques:** File System Forensics, Data Recovery, Autopsy, PhotoRec, Cryptography
- [Read Full Writeup →](/writeups/securinets-2025-recovery)

---

## 🛠️ Tools & Technologies

### Disk Forensics
- FTK Imager
- Autopsy
- Registry Explorer
- RegRipper
- PhotoRec/TestDisk
- debugfs

### Memory Analysis
- Volatility Framework
- MemProcFS

### Malware Analysis
- VirusTotal
- any.run
- strings utility
- IDA Pro

### Programming
- Python
- PyCryptodome

---

## 🧠 Key Takeaways

1. **Layered Analysis:** Success required combining multiple forensics disciplines — disk, memory, and reverse engineering to piece together the complete picture.
2. **Memory is Critical:** Runtime data like command-line arguments and environment variables often only exist in memory and are crucial for investigation.
3. **Artifact Correlation:** Correlating evidence across different sources (disk, memory, network) creates a complete attack timeline.
4. **Dynamic Analysis:** When static analysis is challenging (e.g., Go malware), dynamic analysis platforms become essential tools.
5. **Metadata Matters:** File system metadata like inode timestamps can contain hidden information critical for solving challenges.
6. **Crypto Understanding:** Understanding encryption algorithms and key derivation methods is essential for data recovery challenges.
