import urllib.request
import json
import os
import subprocess

user = "Bikat1995"
url = f"https://api.github.com/users/{user}/repos?per_page=100"

req = urllib.request.Request(url)
# add user agent to avoid 403
req.add_header('User-Agent', 'Mozilla/5.0')

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        os.makedirs("temp_repos", exist_ok=True)
        os.chdir("temp_repos")
        
        for repo in data:
            clone_url = repo["clone_url"]
            name = repo["name"]
            if not os.path.exists(name):
                print(f"Cloning {name}...")
                subprocess.run(["git", "clone", "--depth", "1", clone_url])
            else:
                print(f"Skipping {name}, already exists.")
except Exception as e:
    print(f"Error: {e}")
