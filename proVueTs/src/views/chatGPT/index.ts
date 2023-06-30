import fetch from 'node-fetch';
const localKey = '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';
// Fraze@700
const getAi = async () => {
    const res = await fetch(`https://api.openai.com/v1/completions`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localKey}`
        },
        method: "POST",
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            promp: 'Say this is a test',
            temperature: 0,
            stop: '\n',
            // max_tokens: 4096 - tokens,
            stream: true
        })
    })
    return res
}

export default getAi