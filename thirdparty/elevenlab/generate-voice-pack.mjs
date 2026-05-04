import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const API_KEY = "ABC";

const voices = {
    velvet: "4O2VeVhPyqF1V5Uj1A9c",
    heart: "Azff0p0ck3gnLcpXKPqZ",
    light: "4O2VeVhPyqF1V5Uj1A9c"
};

const phrases = [
    "inhale", "hold", "exhale",
    "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
    "twenty one", "twenty two", "twenty three", "twenty four",
    "twenty five", "twenty six", "twenty seven", "twenty eight",
    "twenty nine", "thirty"
];

const stylePrompts = {
    velvet:
        "Calm feminine meditation voice. Deep, warm, grounding, slow and spacious. Slightly lower pitch. Very soothing, hypnotic, reassuring.",
    heart:
        "Calm feminine meditation guide voice. Warm, happy, gently enthusiastic, peaceful, clear, soft, slow but not sleepy. Natural human delivery. Slight smile in the voice.",
    light:
        "Calm feminine voice with light, uplifting energy. Warm, clear, slightly bright and encouraging. Peaceful but gently energizing."
};

function filename(phrase) {
    return phrase.replaceAll(" ", "-") + ".mp3";
}

async function generate(text, voiceId, style) {
    const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
            method: "POST",
            headers: {
                "xi-api-key": API_KEY,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg"
            },
            body: JSON.stringify({
                text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.65,
                    similarity_boost: 0.75
                },
                previous_text: style
            })
        }
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return Buffer.from(await res.arrayBuffer());
}

async function run() {
    for (const [type, voiceId] of Object.entries(voices)) {
        const dir = path.join("output", type);
        fs.mkdirSync(dir, { recursive: true });

        for (const phrase of phrases) {
            console.log(`${type} → ${phrase}`);
            const audio = await generate(phrase, voiceId, stylePrompts[type]);
            fs.writeFileSync(path.join(dir, filename(phrase)), audio);
        }
    }

    console.log("Done. Voice packs created in ./output");
}

run().catch(error => {
    console.error(error);
    process.exit(1);
});