/**
 * Test: /api/auth/* path erişilebilir mi?
 */
export default function handler(req, res) {
  res.status(200).json({ ok: true, path: '/api/auth/hello', method: req.method });
}
