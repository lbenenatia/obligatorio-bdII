# Expone el bundler web de Expo (puerto 8081) via Cloudflare Tunnel, para abrir la app
# directo en el navegador del celular sin pasar por Expo Go (que ahora pide loguearte
# con una cuenta EAS para usar su propio tunel, ademas de requerir que el SDK del
# proyecto coincida con la version instalada de Expo Go).
#
# A diferencia de ngrok, el "quick tunnel" de Cloudflare no requiere cuenta ni login,
# y no choca con el tunel de ngrok que ya usa start-tunnel.ps1 para el backend (son
# servicios distintos).
#
# Uso:
#   1. Levantar el backend (mvn spring-boot:run) y correr start-tunnel.ps1 (o npm run tunnel).
#   2. Correr: npx expo start --web   (sin --tunnel, sirve el bundle en :8081)
#   3. Ejecutar este script: .\scripts\start-web-tunnel.ps1
#   4. Abrir la URL que te imprime en el navegador del celular.
#
# Para cerrar el tunel despues de la demo: Get-Process cloudflared | Stop-Process

$cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cloudflared) {
    $winget = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Cloudflare.cloudflared_*\cloudflared.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($winget) {
        $cloudflaredPath = $winget.FullName
    } else {
        Write-Error "No se encontro cloudflared. Instalalo con: winget install --id Cloudflare.cloudflared -e"
        exit 1
    }
} else {
    $cloudflaredPath = $cloudflared.Source
}

$existing = Get-Process cloudflared -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "cloudflared ya esta corriendo. Si queres un tunel nuevo, cerralo primero (Get-Process cloudflared | Stop-Process)."
    exit 0
}

Write-Host "Iniciando tunel hacia http://localhost:8081 ..."
$logOut = Join-Path $env:TEMP "cloudflared-mundial2026-out.log"
$logErr = Join-Path $env:TEMP "cloudflared-mundial2026-err.log"
Remove-Item $logErr -ErrorAction SilentlyContinue

Start-Process -FilePath $cloudflaredPath -ArgumentList "tunnel", "--url", "http://localhost:8081" `
    -RedirectStandardOutput $logOut -RedirectStandardError $logErr -WindowStyle Hidden

$publicUrl = $null
for ($intento = 1; $intento -le 20; $intento++) {
    Start-Sleep -Seconds 1
    if (Test-Path $logErr) {
        $match = Select-String -Path $logErr -Pattern "https://[a-z0-9-]+\.trycloudflare\.com" -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($match) {
            $publicUrl = $match.Matches[0].Value
            break
        }
    }
}

if (-not $publicUrl) {
    Write-Error "No se pudo obtener la URL del tunel despues de 20 segundos. Revisa $logErr"
    exit 1
}

Write-Host ""
Write-Host "Listo. Abri esta URL en el navegador del celular:"
Write-Host "  $publicUrl"
Write-Host ""
Write-Host "Para cerrar el tunel despues de la demo: Get-Process cloudflared | Stop-Process"
