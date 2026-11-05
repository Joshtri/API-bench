export const REPO = 'Joshtri/API-bench-app'
export const REPO_URL = `https://github.com/${REPO}`
// Always opens the newest published release, so it is a safe fallback link.
export const RELEASES_URL = `${REPO_URL}/releases/latest`
export const LATEST_RELEASE_API = `https://api.github.com/repos/${REPO}/releases/latest`

// Desktop app version the download links point at when GitHub can't be reached.
// Keep in step with src-tauri/tauri.conf.json in the desktop repo.
export const APP_VERSION = '0.1.1'
