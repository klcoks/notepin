# NotePin 插件打包脚本
# 用法：在项目根目录运行 powershell -File build.ps1
# 输出：dist/notepin-vX.Y.Z.zip （可直接上传 Chrome Web Store）

$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
$manifest = Get-Content "$root\manifest.json" -Raw | ConvertFrom-Json
$version = $manifest.version

$distDir = "$root\dist"
$buildDir = "$distDir\build"
$zipName = "notepin-v$version.zip"
$zipPath = "$distDir\$zipName"

Write-Host "=== Building NotePin v$version ===" -ForegroundColor Cyan

# 清理旧的 build 目录
if (Test-Path $buildDir) { Remove-Item $buildDir -Recurse -Force }
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
New-Item -Path $buildDir -ItemType Directory -Force | Out-Null

# 需要打包的文件/目录
$includes = @(
    'manifest.json',
    'background',
    'content',
    'lib',
    'popup',
    'options',
    'icons'
)

# 不打包的文件（即使在上面目录里也要排除）
$excludePatterns = @(
    '*.ps1',
    '*.md',
    'generate-icons.html',
    '_*.ps1'
)

foreach ($item in $includes) {
    $src = "$root\$item"
    if (-not (Test-Path $src)) {
        Write-Warning "Skip missing: $item"
        continue
    }
    $dst = "$buildDir\$item"
    if ((Get-Item $src).PSIsContainer) {
        # 目录：递归复制，按规则排除
        Copy-Item $src $dst -Recurse -Exclude $excludePatterns
    } else {
        Copy-Item $src $dst
    }
    Write-Host "  + $item" -ForegroundColor Gray
}

# 删除 build 目录里所有匹配的排除文件（防止 Copy-Item -Exclude 在嵌套目录失效）
foreach ($pat in $excludePatterns) {
    Get-ChildItem $buildDir -Recurse -Filter $pat -ErrorAction SilentlyContinue | Remove-Item -Force
}

# 打 zip
Compress-Archive -Path "$buildDir\*" -DestinationPath $zipPath -Force

# 清理临时 build 目录
Remove-Item $buildDir -Recurse -Force

$size = (Get-Item $zipPath).Length / 1KB
Write-Host ""
Write-Host "✓ Done!" -ForegroundColor Green
Write-Host "  Output: $zipPath"
Write-Host ("  Size:   {0:N1} KB" -f $size)
Write-Host ""
Write-Host "Next: upload this zip to https://chrome.google.com/webstore/devconsole" -ForegroundColor Yellow
