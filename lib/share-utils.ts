export async function shareLink(
  url: string,
  title: string,
  text?: string
): Promise<void> {
  const shareData = {
    title: title,
    text: text || `Check out: ${title}`,
    url: url,
  }

  // Try Web Share API first (mobile)
  if (navigator.share) {
    try {
      await navigator.share(shareData)
      return
    } catch (err) {
      // User cancelled or error occurred, fall back to clipboard
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err)
      }
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(url)
    // Return success - caller can show toast
    return
  } catch (err) {
    console.error('Failed to copy link:', err)
    throw new Error('Failed to share link')
  }
}
