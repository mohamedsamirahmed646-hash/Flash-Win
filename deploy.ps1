# FlashWin Landing Page - Deploy Helper
# بيعمل ZIP للمشروع كله جاهز ترفعه على Netlify

param(
    [string]$OutputZip = "$PSScriptRoot\flashwin-landing-deploy.zip"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " FlashWin Landing Page - Packager" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot
Write-Host "Project folder: $projectRoot" -ForegroundColor Yellow
Write-Host "Output zip:     $OutputZip" -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path "$projectRoot\index.html")) {
    Write-Host "ERROR: index.html not found in $projectRoot" -ForegroundColor Red
    exit 1
}

if (Test-Path $OutputZip) {
    Remove-Item $OutputZip -Force
    Write-Host "Removed old zip" -ForegroundColor DarkGray
}

try {
    Compress-Archive -Path "$projectRoot\*" -DestinationPath $OutputZip -Force
    $size = [math]::Round((Get-Item $OutputZip).Length / 1KB, 1)
    Write-Host ""
    Write-Host "SUCCESS! Zip created ($size KB):" -ForegroundColor Green
    Write-Host "  $OutputZip" -ForegroundColor White
    Write-Host ""
    Write-Host "Next step: open https://app.netlify.com/drop and drop the zip" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
    exit 1
}
