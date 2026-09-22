"""Tiny one-shot receiver so the in-page harness can hand its JSON to disk.

    python tools/automation-audit/receive.py docs/automation/engine-tags.json

then, in the page:  fetch("http://localhost:8799", {method:"POST", body: JSON.stringify(auditEngineTags())})
It writes the body (pretty-printed) and exits after the first POST.
"""
import http.server, json, sys, os

OUT = sys.argv[1] if len(sys.argv) > 1 else "docs/automation/engine-tags.json"

class H(http.server.BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()
    def do_POST(self):
        body = self.rfile.read(int(self.headers["Content-Length"]))
        data = json.loads(body.decode("utf-8"))
        os.makedirs(os.path.dirname(OUT) or ".", exist_ok=True)
        text = json.dumps(data, ensure_ascii=False, indent=1, sort_keys=True)
        with open(OUT + ".tmp", "w", encoding="utf-8", newline="\n") as f: f.write(text)
        os.replace(OUT + ".tmp", OUT)
        self.send_response(200); self._cors(); self.end_headers(); self.wfile.write(b"ok")
        print("wrote", OUT, len(text), "chars", flush=True)
        raise SystemExit
    def log_message(self, *a): pass

http.server.HTTPServer(("localhost", 8799), H).handle_request()
