$content = Get-Content -Path "C:\Users\Karlo\.gemini\antigravity\scratch\2lmf-pro-web-2.0\architects_blueprint.html" -Raw

$content = $content.Replace("POA,`'ETNA", "POČETNA")
$content = $content.Replace("odli?nim", "odličnim")
$content = $content.Replace("odli?nim", "odličnim")
$content = $content.Replace("monta_a", "montaža")
$content = $content.Replace("monta_a", "montaža")
$content = $content.Replace("graA,`?~evinskikalkulator", "građevinskikalkulator")
$content = $content.Replace("graevinski", "građevinski")
$content = $content.Replace("Mre_a", "Mreža")
$content = $content.Replace("mre_a", "mreža")
$content = $content.Replace("zna?i", "znači")
$content = $content.Replace("zna?i", "znači")

$content = $content.Replace("O", "Č")
$content = $content.Replace("o", "č")
$content = $content.Replace("?", "ć")
$content = $content.Replace("", "")

Set-Content -Path "C:\Users\Karlo\.gemini\antigravity\scratch\2lmf-pro-web-2.0\architects_blueprint.html" -Value $content -Encoding UTF8
Write-Host "Replaced targeted strings."
