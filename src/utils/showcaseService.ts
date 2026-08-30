import { ShowcaseSubmission } from '../types';

/**
 * Service handler for Hackers Occupied Pune Project Showcase Submissions.
 * Initiative by AIDN × Genesis.
 * 
 * NOTE: Currently configured with local state persistence.
 * When connecting Supabase in the future, replace the simulated delay
 * with the standard Supabase insert call:
 * 
 * const { data, error } = await supabase
 *   .from('hackers_occupied_pune_submissions')
 *   .insert([submission])
 *   .select();
 */

export async function submitShowcaseProject(
  submission: ShowcaseSubmission
): Promise<{ success: boolean; data?: ShowcaseSubmission; error?: string }> {
  try {
    // Artificial latency for authentic submission feedback
    await new Promise((resolve) => setTimeout(resolve, 800));

    const submissionWithMetadata: ShowcaseSubmission = {
      ...submission,
      id: `submission-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      createdAt: new Date().toISOString(),
    };

    // Save to local storage for local persistence / testing
    try {
      const existingRaw = localStorage.getItem('aidn_showcase_submissions');
      const existing: ShowcaseSubmission[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.unshift(submissionWithMetadata);
      localStorage.setItem('aidn_showcase_submissions', JSON.stringify(existing));
    } catch {
      // Ignore local storage quotas or private browsing errors
    }

    return {
      success: true,
      data: submissionWithMetadata,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred while submitting.';
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Validates a URL string format.
 */
export function isValidUrl(url: string): boolean {
  if (!url || !url.trim()) return true; // empty is handled separately
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates an email address format.
 */
export function isValidEmail(email: string): boolean {
  if (!email || !email.trim()) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
