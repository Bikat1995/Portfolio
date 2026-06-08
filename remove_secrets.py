import os
import subprocess

repos = [
    {
        "name": "Football-Prediction-Ai",
        "url": "https://github.com/Bikat1995/Football-Prediction-Ai.git",
        "env_files": [".env", "tg_bot/.env"]
    },
    {
        "name": "PinPay",
        "url": "https://github.com/Bikat1995/PinPay.git",
        "env_files": ["backend/.env"]
    },
    {
        "name": "Yetal",
        "url": "https://github.com/Bikat1995/Yetal.git",
        "env_files": [".env"]
    }
]

os.makedirs("cleanup_repos", exist_ok=True)
os.chdir("cleanup_repos")

for repo in repos:
    print(f"Processing {repo['name']}...")
    if not os.path.exists(repo['name']):
        subprocess.run(["git", "clone", repo['url']])
    
    os.chdir(repo['name'])
    
    # Remove env files from git tracking
    for env_file in repo['env_files']:
        if os.path.exists(env_file):
            subprocess.run(["git", "rm", "--cached", env_file])
            print(f"Removed {env_file} from git tracking.")
    
    # Ensure .env is in .gitignore
    gitignore_path = ".gitignore"
    if os.path.exists(gitignore_path):
        with open(gitignore_path, "r") as f:
            content = f.read()
    else:
        content = ""
        
    if ".env" not in content:
        with open(gitignore_path, "a") as f:
            f.write("\n.env\n")
        print("Added .env to .gitignore.")
        subprocess.run(["git", "add", ".gitignore"])
    
    # Commit and push
    res = subprocess.run(["git", "commit", "-m", "Remove exposed .env files and update .gitignore"], capture_output=True, text=True)
    if "nothing to commit" not in res.stdout:
        print(res.stdout)
        print("Pushing changes...")
        subprocess.run(["git", "push"])
    else:
        print("No changes to commit for this repo.")
    
    os.chdir("..")

print("Cleanup complete.")
