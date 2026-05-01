const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = 'http://localhost:11434/api/generate';

app.post('/analyze', async (req, res) => {
    const { transcript } = req.body;

    // Strict prompt to counter hallucination and bias
    const prompt = `
    Analyze this transcript as a Senior Psychology Intern at DeepThought. 
    
    ### THE RUBRIC RULES[cite: 3, 4]
    1. THE SURVIVABILITY TEST: If the Fellow left tomorrow, would the work they built continue running? 
       - If NO (Personal Heroism/Task Absorption), the score MUST be 5 or 6.
       - If YES (Process/SOP/Tracker), the score can be 7 or higher.
    2. THE 6 vs 7 BOUNDARY: 
       - Score 6: The supervisor is happy because the Fellow is reliable and handles their workload (Helpfulness Bias).
       - Score 7: The Fellow identified a problem the supervisor didn't ask them to solve.
    3. BIAS WARNING: Ignore "Helpfulness Bias." Do not reward Anil for waking up at 3 AM to handle a power failure; that is personal heroism, not a system.
    
    ### EXPECTED SCORING FOR ANIL MENON[cite: 2, 4]
    - Anil should score between 5 and 6. 
    - Reason: He is absorbing the founder's tasks (Layer 1) but hasn't built self-sustaining systems.
    
    Transcript: ${transcript}
    
    ### OUTPUT FORMAT
    Return ONLY a JSON object: { "score": number, "label": "string", "justification": "string", "evidence": [], "kpis": [], "gaps": [] }
`;

    try {
        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            body: JSON.stringify({
                model: 'llama3.2', // Pull this model in Ollama first
                prompt: prompt,
                stream: false,
                format: 'json'
            })
        });
        const data = await response.json();
        res.json(JSON.parse(data.response));
    } catch (err) {
        res.status(500).json({ error: "Ollama not found. Run 'ollama run llama3.2' locally." });
    }
});

app.listen(3000, () => console.log('Server: http://localhost:3000'));