# Blood Donor Finder - Push Frontend to GitHub
Write-Host "=== Blood Donor Finder Frontend - GitHub Push ===" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
$frontendPath = "c:\Users\Vasantha Priyan\Downloads\demo (21)\demo\frontend"
Set-Location $frontendPath
Write-Host "Working directory: $frontendPath" -ForegroundColor Green

# Check if this is already a git repository
if (Test-Path ".git") {
    Write-Host "Git repository already exists" -ForegroundColor Green
} else {
    Write-Host "Initializing new Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Git repository initialized" -ForegroundColor Green
}

# Create .gitignore for frontend if it doesn't exist
if (-not (Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore file..." -ForegroundColor Yellow
    @"
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build output
dist/
build/
.vite/

# Environment files
.env
.env.local
.env.production.local
.env.development.local

# Editor directories
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
    Write-Host ".gitignore created" -ForegroundColor Green
}

# Step 1: Stage all files
Write-Host "`n--- Step 1: Staging All Files ---" -ForegroundColor Yellow
git add -A
Write-Host "All files staged" -ForegroundColor Green

# Step 2: Check status
Write-Host "`n--- Step 2: Repository Status ---" -ForegroundColor Yellow
git status

# Step 3: Commit changes
Write-Host "`n--- Step 3: Committing Changes ---" -ForegroundColor Yellow
$commitMessage = "Initial commit - Blood Donor Finder Frontend (React + Vite)"
git commit -m $commitMessage -m "Features: Donor Registration, Search, Profile, Admin Dashboard, Emergency Requests" -m "Tech Stack: React 18, Vite, Axios, Three.js for 3D backgrounds"
if ($LASTEXITCODE -eq 0) {
    Write-Host "Changes committed successfully" -ForegroundColor Green
} else {
    Write-Host "No changes to commit or commit skipped" -ForegroundColor Yellow
}

# Step 4: GitHub Repository Setup
Write-Host "`n--- Step 4: GitHub Repository Setup ---" -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Create a new repository on GitHub first:" -ForegroundColor Red
Write-Host ""
Write-Host "1. Open your browser and go to: https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Fill in the details:" -ForegroundColor Yellow
Write-Host "   Repository name: blood-donor-finder-frontend" -ForegroundColor White
Write-Host "   Description: Blood Donor Finder - React Frontend with Vite" -ForegroundColor White
Write-Host "   Visibility: Public (or Private - your choice)" -ForegroundColor White
Write-Host ""
Write-Host "3. IMPORTANT: DO NOT check these boxes:" -ForegroundColor Red
Write-Host "   ❌ Add a README file" -ForegroundColor White
Write-Host "   ❌ Add .gitignore" -ForegroundColor White
Write-Host "   ❌ Choose a license" -ForegroundColor White
Write-Host ""
Write-Host "4. Click 'Create repository'" -ForegroundColor Cyan
Write-Host ""
Write-Host "----------------------------------------------------------------" -ForegroundColor Gray
Write-Host ""

# Get repository name
$repoName = Read-Host "Enter your repository name (press Enter for 'blood-donor-finder-frontend')"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "blood-donor-finder-frontend"
}

$username = "vasanth005-117"
$repoUrl = "https://github.com/$username/$repoName.git"

# Step 5: Add remote origin
Write-Host "`n--- Step 5: Adding Remote Origin ---" -ForegroundColor Yellow
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "Updating existing remote origin..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
} else {
    git remote add origin $repoUrl
}
Write-Host "Remote origin set to: $repoUrl" -ForegroundColor Green

# Step 6: Set branch to main
Write-Host "`n--- Step 6: Setting Up Main Branch ---" -ForegroundColor Yellow
$currentBranch = git branch --show-current
if ([string]::IsNullOrWhiteSpace($currentBranch)) {
    # No commits yet, will create main branch on first commit
    git checkout -b main
    Write-Host "Created 'main' branch" -ForegroundColor Green
} elseif ($currentBranch -ne "main") {
    git branch -M main
    Write-Host "Renamed branch to 'main'" -ForegroundColor Green
} else {
    Write-Host "Already on 'main' branch" -ForegroundColor Green
}

# Step 7: Push to GitHub
Write-Host "`n--- Step 7: Pushing to GitHub ---" -ForegroundColor Yellow
Write-Host ""
Write-Host "When prompted for credentials:" -ForegroundColor Cyan
Write-Host "  Username: vasanth005-117" -ForegroundColor White
Write-Host "  Password: Use a Personal Access Token (NOT your GitHub password)" -ForegroundColor White
Write-Host ""
Write-Host "If you don't have a token, create one at:" -ForegroundColor Yellow
Write-Host "  https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "  Click 'Generate new token (classic)'" -ForegroundColor White
Write-Host "  Select 'repo' scope" -ForegroundColor White
Write-Host "  Copy the token and use it as your password" -ForegroundColor White
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow

git push -u origin main

# Check result
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                    SUCCESS! 🎉                            ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your frontend has been pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL:" -ForegroundColor Yellow
    Write-Host "  https://github.com/$username/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "View your code:" -ForegroundColor Yellow
    Write-Host "  https://github.com/$username/$repoName/tree/main" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "  1. Update your Vercel deployment to use this repository" -ForegroundColor White
    Write-Host "  2. Add a detailed README.md file" -ForegroundColor White
    Write-Host "  3. Consider adding screenshots to README" -ForegroundColor White
    Write-Host "  4. Set up GitHub Actions for automated deployment" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "║                    PUSH FAILED                            ║" -ForegroundColor Red
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues and solutions:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Repository doesn't exist:" -ForegroundColor Yellow
    Write-Host "   → Create it on GitHub first: https://github.com/new" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Authentication failed:" -ForegroundColor Yellow
    Write-Host "   → Use Personal Access Token, not password" -ForegroundColor White
    Write-Host "   → Create token at: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Wrong repository name:" -ForegroundColor Yellow
    Write-Host "   → Check the name matches what you created on GitHub" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Already exists error:" -ForegroundColor Yellow
    Write-Host "   → The repository might already have content" -ForegroundColor White
    Write-Host "   → Try: git pull origin main --allow-unrelated-histories" -ForegroundColor White
    Write-Host "   → Then: git push -u origin main" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
