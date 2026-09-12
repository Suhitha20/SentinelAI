#!/usr/bin/env python3
"""
SENTINEL AI — Local Dev Server
Starts a clean, lightweight HTTP server on port 3000.
"""

import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Keep operational dev log clean
        pass

def start_server():
    os.chdir(DIRECTORY)
    port = PORT
    for attempt in range(5):
        try:
            # Use ThreadingHTTPServer so multiple assets/tiles/API calls load concurrently
            server_cls = getattr(http.server, 'ThreadingHTTPServer', socketserver.TCPServer)
            with server_cls(("", port), Handler) as httpd:
                print(f"\n========================================================")
                print(f"  SENTINEL AI — Intelligent Disaster Command Platform")
                print(f"  Server online at: http://localhost:{port}")
                print(f"  Serving directory: {DIRECTORY}")
                print(f"========================================================\n", flush=True)
                httpd.serve_forever()
        except OSError as e:
            if "address already in use" in str(e).lower():
                port += 1
            else:
                raise e

if __name__ == "__main__":
    start_server()
