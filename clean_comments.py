import os
import re

def clean_python_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove # comments, but be careful with # inside strings. 
    # A simple approach for this specific project (since there are no complex string hashes)
    # We will just remove lines that start with optional whitespace and #
    cleaned_lines = []
    for line in content.split('\n'):
        if not re.match(r'^\s*#', line):
            cleaned_lines.append(line)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(cleaned_lines))

def clean_ts_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove block comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    
    # Remove line comments that don't follow a colon (to preserve http://)
    # Also don't strip if inside string, but for our TSX files a simple regex works:
    cleaned_lines = []
    for line in content.split('\n'):
        # If line is just a comment, remove it
        if re.match(r'^\s*//', line):
            continue
        # Remove trailing comments //... (but not http://)
        line = re.sub(r'(?<!:)//.*$', '', line)
        cleaned_lines.append(line)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(cleaned_lines))

backend_dir = r"c:\Users\sys\Music\complete_portfolio\Profolio_Backend"
frontend_dir = r"c:\Users\sys\Music\complete_portfolio\My_Portfolio\src"

# Clean Backend
for root, dirs, files in os.walk(backend_dir):
    if '.venv' in root or 'migrations' in root or '__pycache__' in root:
        continue
    for file in files:
        if file.endswith('.py'):
            clean_python_file(os.path.join(root, file))

# Clean Frontend
for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            clean_ts_file(os.path.join(root, file))

print("Comments removed successfully.")
