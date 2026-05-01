# Supervisor Feedback Analyzer — Trinethra Module

## Project Overview
Trinethra is a diagnostic tool designed for DeepThought technical program managers and psychology interns. It reduces the time spent analyzing supervisor transcripts from 60 minutes to 10 minutes by using a local LLM to extract behavioral evidence and map it to a 1-10 performance rubric.

---

## Tech Stack
- **Frontend:** HTML5, Tailwind CSS, JavaScript (Vanilla)  
- **Backend:** Node.js with Express  
- **AI Engine:** Ollama (Local LLM)  
- **Model:** llama3.2 (Chosen for its balance of speed and reasoning on local hardware)

---

## Initial Setup

Follow these steps to run the project locally:

### 1. Prerequisites
- Node.js installed on your system  
- Ollama installed from https://ollama.com  

---

### 2. LLM Setup
Open your terminal and pull the required model:

```bash
ollama pull llama3.2


3. Installation

Clone this repository.

Navigate to the project folder and install dependencies:

npm install
4. Running the App

Start the backend server:

node server.js

Open index.html in your preferred web browser.

Architecture Overview

The app follows a simple Client-Server architecture:

Client: A web interface where the user pastes a transcript. It sends a POST request to the backend.
Server: A Node.js API that receives the transcript, wraps it in a "Guardrail Prompt" containing the DT Rubric, and forwards it to Ollama.
Ollama: Processes the request locally and returns a structured JSON analysis.
Design Challenges Tackled
Challenge 2: Structured Output Reliability

To prevent the LLM from returning messy text or broken JSON, I implemented:

Strict JSON Formatting: The prompt explicitly demands a JSON structure
UI Fallbacks: The frontend uses logical OR operators (e.g., e.quote || e.text) to ensure the interface doesn't break if the AI slightly changes key names
Challenge 5: Gap Detection

Detecting what is missing is harder than extracting what is there. I solved this by:

Dimension Checklist: Providing the LLM with the four DT assessment dimensions (Execution, Systems Building, KPI Impact, Change Management) and asking it to flag any dimension that lacks supporting quotes
Countering AI Hallucination

During development, the AI initially suffered from Helpfulness Bias, giving a high score (9) to "Anil Menon" because the supervisor was happy. I corrected this by:

Implementing a "Survivability Test" in the system prompt
Forcing the AI to distinguish between Layer 1 (Execution) and Layer 2 (Systems Building)

As a result, the tool now accurately scores the Anil transcript as a 5-6, identifying it as task absorption rather than system creation.
