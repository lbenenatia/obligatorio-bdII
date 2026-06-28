# Expone el backend local (puerto 8080) via ngrok y apunta el frontend a esa URL
# publica, para poder probar la app desde un celular durante la demo del obligatorio.
#
# Uso:
#   1. Levantar el backend (mvn spring-boot:run) ANTES de correr este script.
#   2. Ejecutar: .\scripts\start-tunnel.ps1   (desde la carpeta frontend)
#   3. Correr: npx expo start --tunnel
#   4. Abrir la URL/QR que muestre Expo desde el celular.
#
# Para cerrar el tunel despues de la demo: Get-Process ngrok | Stop-Process

# OJO: no usar simplemente "ngrok" - @expo/ngrok (instalado para expo start --tunnel)
# trae su propio ngrok.exe viejo (v2, sin autenticar) en node_modules\.bin, y "npm run"
# antepone esa carpeta al PATH. Si se resuelve ese binario en vez del ngrok v3 global
# (el autenticado con tu cuenta), falla con ERR_NGROK_4018. Por eso se apunta directo
# al ejecutable global de Windows.
$ngrokGlobal = Join-Path $env:LOCALAPPDATA "Microsoft\WindowsApps\ngrok.exe"
if (-not (Test-Path $ngrokGlobal)) {
    Write-Error "No se encontro ngrok en $ngrokGlobal. Instalalo (winget install ngrok) y logueate (ngrok config add-authtoken ...)."
    exit 1
}

$existing = Get-Process ngrok -ErrorAction SilentlyContinue
if (-not $existing) {
    Write-Host "Iniciando tunel ngrok hacia http://localhost:8080 ..."
    $ngrokLog = Join-Path $env:TEMP "ngrok-mundial2026.log"

    # Start-Process con -FilePath apuntando directo al alias de ngrok falla ("no es una
    # aplicacion Win32 valida") porque intenta lanzarlo via CreateProcess. Se arma el
    # comando en un .cmd temporal (sin redirecciones adentro) y se lanza via
    # "cmd.exe /c <archivo>" dejando que -RedirectStandardOutput de Start-Process
    # capture la salida - así no hay que escapar comillas/redirecciones a mano en un
    # -ArgumentList armado como string, que es frágil y se rompe fácil.
    $tempBat = Join-Path $env:TEMP "start-ngrok-mundial2026.cmd"
    @"
@echo off
"$ngrokGlobal" http 8080 --log=stdout 2>&1
"@ | Out-File -FilePath $tempBat -Encoding ascii

    Start-Process -FilePath "cmd.exe" -ArgumentList "/c", $tempBat -RedirectStandardOutput $ngrokLog -WindowStyle Hidden
} else {
    Write-Host "ngrok ya esta corriendo, reutilizando el tunel existente."
}

# El agente de ngrok puede tardar en levantar la API local y, despues de eso, un poco
# mas en negociar la URL publica con sus servidores (varia con la red) - se reintenta
# todo junto en vez de esperar un tiempo fijo.
$publicUrl = $null
$pudoConsultar = $false
for ($intento = 1; $intento -le 25; $intento++) {
    Start-Sleep -Seconds 1
    try {
        $tunnels = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -ErrorAction Stop
        $pudoConsultar = $true
        $publicUrl = ($tunnels.tunnels | Where-Object { $_.proto -eq "https" } | Select-Object -First 1).public_url
        if ($publicUrl) { break }
    } catch {
    }
}

if (-not $pudoConsultar) {
    Write-Error "No se pudo consultar ngrok en 127.0.0.1:4040 despues de 25 segundos. ¿Esta instalado y logueado? (ngrok config check)"
    exit 1
}

if (-not $publicUrl) {
    Write-Error "ngrok respondio pero todavia no asigno una URL publica despues de 25 segundos. Volve a correr el script."
    exit 1
}

Write-Host "Backend publico en: $publicUrl"

$envPath = Join-Path $PSScriptRoot "..\.env.local"
"EXPO_PUBLIC_API_URL=$publicUrl/api" | Out-File -FilePath $envPath -Encoding utf8 -NoNewline

Write-Host ""
Write-Host "Listo. .env.local actualizado con EXPO_PUBLIC_API_URL=$publicUrl/api"
Write-Host ""
Write-Host "Ahora corre (si no lo tenes ya corriendo):"
Write-Host "  npx expo start --tunnel"
Write-Host ""
Write-Host "Para cerrar el tunel despues de la demo: Get-Process ngrok | Stop-Process"
