// Reports only whether a server key exists. Never returns the key.
export default function handler(req, res) {
  res.status(200).json({ ai: Boolean(process.env.ANTHROPIC_API_KEY) });
}
