---
title: "Memory Forensics with Volatility 3"
date: "2025-01-15"
category: "Walkthrough"
tags: ["Memory Forensics", "Volatility", "DFIR", "Malware Analysis"]
description: "A complete beginner-to-intermediate guide to memory forensics using Volatility 3. Covers installation, essential plugins, process analysis, network artifact extraction, and memory-resident malware hunting."
stats: "Beginner-Intermediate • ~20 min read"
---

# Memory Forensics with Volatility 3

Memory forensics is one of the most powerful techniques in the DFIR analyst's arsenal. RAM contains runtime state that never touches disk — active processes, network connections, encryption keys, and decrypted malware payloads.

---

## Prerequisites

- Linux or Windows machine
- Python 3.8+
- A memory dump (`.dmp`, `.raw`, `.vmem`)

---

## Installation

```bash
git clone https://github.com/volatilityfoundation/volatility3.git
cd volatility3
pip3 install -r requirements.txt
python3 setup.py install
```

Verify installation:
```bash
python3 vol.py --version
```

---

## Step 1: Identify the OS Profile

```bash
python3 vol.py -f memory.dmp windows.info
```

This gives you the OS build, kernel, and architecture — critical for understanding what plugins to use.

---

## Step 2: List Processes

```bash
# Standard process list
python3 vol.py -f memory.dmp windows.pslist

# Process tree (parent-child relationships)
python3 vol.py -f memory.dmp windows.pstree

# Detect hidden processes (hollowing, injection)
python3 vol.py -f memory.dmp windows.psscan
```

> **Tip:** Compare `pslist` vs `psscan` output. Discrepancies often indicate process hiding via DKOM (Direct Kernel Object Manipulation).

---

## Step 3: Analyze Command Lines

```bash
python3 vol.py -f memory.dmp windows.cmdline
```

Look for:
- `powershell -enc` (base64 encoded commands)
- `cmd /c` chains
- Unusual parent-child combos like `Word.exe → cmd.exe`

---

## Step 4: Network Connections

```bash
python3 vol.py -f memory.dmp windows.netstat
```

**What to look for:**
| Indicator | Suspicion |
|-----------|-----------|
| Unusual port (4444, 1337, 8888) | Reverse shells |
| `ESTABLISHED` to foreign IP | Active C2 |
| Process = `svchost.exe` connecting out | Rare, suspicious |

---

## Step 5: DLL and Module Analysis

```bash
# List loaded DLLs for a specific process
python3 vol.py -f memory.dmp windows.dlllist --pid 1234

# Detect injected code
python3 vol.py -f memory.dmp windows.malfind
```

`malfind` searches for memory regions with `PAGE_EXECUTE_READWRITE` permissions that contain PE headers — a classic sign of process injection.

---

## Step 6: Extract Files

```bash
# Dump files referenced in memory
python3 vol.py -f memory.dmp windows.dumpfiles --pid 1234

# Dump a specific process executable
python3 vol.py -f memory.dmp windows.pslist --pid 1234 --dump
```

Take extracted files and submit to **VirusTotal** or analyze with **Ghidra/IDA**.

---

## Common Investigation Workflow

```
1. windows.info          → Identify OS
2. windows.pstree        → Understand process hierarchy
3. windows.psscan        → Find hidden processes
4. windows.cmdline       → Extract command lines
5. windows.netstat       → Find network activity
6. windows.malfind       → Locate injected code
7. windows.dumpfiles     → Extract suspicious files
```

---

## Resources

- [Volatility 3 GitHub](https://github.com/volatilityfoundation/volatility3)
- [The Art of Memory Forensics (book)](https://www.wiley.com/en-us/The+Art+of+Memory+Forensics-p-9781118825099)
- [MemLabs Practice Challenges](https://github.com/stuxnet999/MemLabs)
